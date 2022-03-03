package pong

type Ball struct {
	Position
	Radius float32 `json:"radius"`
	XSpeed float32
	YSpeed float32
}

func (b *Ball) update(leftPaddle *Paddle, rightPaddle *Paddle) {
	b.X += b.XSpeed
	b.Y += b.YSpeed

	// bounce off edges when getting to top/bottom
	if b.Y-b.Radius > float32(windowHeight) {
		b.YSpeed = -b.YSpeed
		b.Y = float32(windowHeight) - b.Radius
	} else if b.Y+b.Radius < 0 {
		b.YSpeed = -b.YSpeed
		b.Y = b.Radius
	}

	// bounce off paddles
	if b.X-b.Radius < leftPaddle.X+float32(leftPaddle.Width/2) &&
		b.Y > leftPaddle.Y-float32(leftPaddle.Height/2) &&
		b.Y < leftPaddle.Y+float32(leftPaddle.Height/2) {
		b.XSpeed = -b.XSpeed
		b.X = leftPaddle.X + float32(leftPaddle.Width/2) + b.Radius
	} else if b.X+b.Radius > rightPaddle.X-float32(rightPaddle.Width/2) &&
		b.Y > rightPaddle.Y-float32(rightPaddle.Height/2) &&
		b.Y < rightPaddle.Y+float32(rightPaddle.Height/2) {
		b.XSpeed = -b.XSpeed
		b.X = rightPaddle.X - float32(rightPaddle.Width/2) - b.Radius
	}
}

func (b *Ball) reset() {
	b.Position.X = float32(windowWidth/2 - ballRadius)
	b.Position.Y = float32(windowHeight/2 - ballRadius)
	b.XSpeed = initialBallSpeed
	b.YSpeed = initialBallSpeed
}

func (b *Ball) restart() {
	b.reset()
}

func NewBall() *Ball {
	return &Ball{
		Position: Position{
			X: float32(windowWidth/2 - ballRadius),
			Y: float32(windowHeight/2 - ballRadius),
		},
		Radius: ballRadius,
		XSpeed: initialBallSpeed,
		YSpeed: initialBallSpeed,
	}
}
