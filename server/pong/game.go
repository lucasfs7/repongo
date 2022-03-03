package pong

import (
	"time"
)

type GameStatus byte

const (
	GameNotStarted GameStatus = iota
	GameInProgress
	GameOver
)

type Game struct {
	Status   GameStatus `json:"status"`
	Ball     *Ball      `json:"ball"`
	Player1  *Paddle    `json:"player1"`
	Player2  *Paddle    `json:"player2"`
	rally    int
	level    int
	maxScore int
}

func (g *Game) update() {
	g.Player1.update()
	g.Player2.update()

	lastBallXSpeed := g.Ball.XSpeed
	g.Ball.update(g.Player1, g.Player2)

	// rally count
	if lastBallXSpeed*g.Ball.XSpeed < 0 {
		g.rally++

		// spice things up
		if (g.rally)%speedUpdateCount == 0 {
			g.level++
			g.Ball.XSpeed += speedIncrement
			g.Ball.YSpeed += speedIncrement
			g.Player1.Speed += speedIncrement
			g.Player2.Speed += speedIncrement
		}
	}

	if g.Ball.X < 0 {
		g.Player2.Score++
		g.Status = GameNotStarted
		g.reset()
	} else if g.Ball.X > float32(windowWidth) {
		g.Player1.Score++
		g.Status = GameNotStarted
		g.reset()
	}

	if g.Player1.Score == g.maxScore || g.Player2.Score == g.maxScore {
		g.Status = GameOver
	}
}

func (g *Game) reset() {
	g.level = 0
	g.rally = 0

	g.Ball.reset()
	g.Player1.reset()
	g.Player2.reset()
}

func (g *Game) Restart() {
	g.level = 0
	g.rally = 0

	g.Ball.restart()
	g.Player1.restart()
	g.Player2.restart()
}

func (g *Game) Run(afterUpdateHook func()) {
	ticker := time.NewTicker(16 * time.Millisecond)

	go func() {
		for {
			select {
			case <-ticker.C:
				switch g.Status {
				case GameInProgress:
					g.update()
					afterUpdateHook()
				}
			}
		}
	}()
}

func NewGame() *Game {
	return &Game{
		Status:   GameNotStarted,
		Ball:     NewBall(),
		Player1:  NewPaddle(PaddlePlacementLeft),
		Player2:  NewPaddle(PaddlePlacementRight),
		maxScore: 11,
	}
}
