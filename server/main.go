package main

import (
	"net/http"

	"github.com/lucasfs7/repongo/pong"
	"golang.org/x/net/websocket"
)

type Game struct {
	*pong.Game
	ws *websocket.Conn
}

type GameState struct {
	Player1 pong.Paddle     `json:"player1"`
	Player2 pong.Paddle     `json:"player2"`
	Ball    pong.Ball       `json:"ball"`
	State   pong.GameStatus `json:"status"`
}

type WsInput struct {
	Type   string
	Actor  string
	Target string
}

func (g *Game) handleWsConnection(ws *websocket.Conn) {
	g.ws = ws
	state := GameState{*g.Player1, *g.Player2, *g.Ball, g.Status}

	websocket.JSON.Send(ws, state)

	for {
		var data WsInput
		websocket.JSON.Receive(ws, &data)

		switch data.Type {
		case "start":
			g.Status = pong.GameInProgress

		case "restart":
			g.Restart()
			g.Status = pong.GameInProgress

		case "keyup":
			if data.Actor == "p1" {
				g.Player1.Direction = pong.DirectionNotMoving
			}

			if data.Actor == "p2" {
				g.Player2.Direction = pong.DirectionNotMoving
			}

		case "keydown":
			if data.Target == "down" && data.Actor == "p1" {
				g.Player1.Direction = pong.DirectionDown
			}

			if data.Target == "down" && data.Actor == "p2" {
				g.Player2.Direction = pong.DirectionDown
			}

			if data.Target == "up" && data.Actor == "p1" {
				g.Player1.Direction = pong.DirectionUP
			}

			if data.Target == "up" && data.Actor == "p2" {
				g.Player2.Direction = pong.DirectionUP
			}
		}
	}
}

func main() {
	game := &Game{
		Game: pong.NewGame(),
	}

	game.Run(func() {
		state := GameState{*game.Player1, *game.Player2, *game.Ball, game.Status}
		websocket.JSON.Send(game.ws, state)
	})

	http.HandleFunc("/",
		func(w http.ResponseWriter, req *http.Request) {
			s := websocket.Server{Handler: websocket.Handler(game.handleWsConnection)}
			s.ServeHTTP(w, req)
		})

	err := http.ListenAndServe("0.0.0.0:8080", nil)

	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}
