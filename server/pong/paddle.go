package pong

type PaddlePlacement byte

const (
	PaddlePlacementLeft = iota
	PaddlePlacementRight
)

type Paddle struct {
	Position
	Score     int `json:"score"`
	Width     int `json:"width"`
	Height    int `json:"height"`
	Speed     float32
	Direction Direction
	Placement PaddlePlacement
}

func (p *Paddle) update() {
	if p.Direction == DirectionUP {
		p.Y -= p.Speed
	} else if p.Direction == DirectionDown {
		p.Y += p.Speed
	}

	if p.Y <= 0 {
		p.Y = float32(1)
	} else if p.Y >= float32(windowHeight-p.Height) {
		p.Y = float32(windowHeight - p.Height - 1)
	}
}

func (p *Paddle) reset() {
	p.Position.Y = float32(windowHeight/2 - paddleHeight/2)
	p.Speed = initialPaddleSpeed
	p.Direction = DirectionNotMoving

	if p.Placement == PaddlePlacementLeft {
		p.Position.X = paddleShift
	}

	if p.Placement == PaddlePlacementRight {
		p.Position.X = float32(windowWidth - p.Width - paddleShift)
	}
}

func (p *Paddle) restart() {
	p.reset()
	p.Score = 0
}

func NewPaddle(placement PaddlePlacement) *Paddle {
	p := &Paddle{
		Width:     paddleWidth,
		Height:    paddleHeight,
		Placement: placement,
	}

	p.restart()

	return p
}
