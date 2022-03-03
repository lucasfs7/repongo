package pong

type Direction byte

const (
	DirectionNotMoving Direction = iota
	DirectionUP
	DirectionDown
)

type Position struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
}
