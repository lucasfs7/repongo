import { useContext, useState } from 'react'

import Box from './Box'
import Text from './Text'
import Paddle, { DEFAULT_PADDLE_HEIGHT, DEFAULT_PADDLE_SHIFT } from './Paddle'
import Ball from './Ball'
import WsContext from '../contexts/websocket'
import useKeypress from '../hooks/use-keypress'

const GAME_WINDOW_WIDTH = 800
const GAME_WINDOW_HEIGHT = 600
const INITIAL_PADDLE_POSITION =
  GAME_WINDOW_HEIGHT / 2 - DEFAULT_PADDLE_HEIGHT / 2

interface Position {
  x: number
  y: number
}

interface PlayerState extends Position {
  score: number
}

interface BallState extends Position {}

interface GameState {
  player1: PlayerState
  player2: PlayerState
  ball: BallState
}

export default function Game() {
  const { connection: ws } = useContext(WsContext)
  const [{player1, player2, ball}, setGameState] = useState<GameState>({
    player1: {
      x: DEFAULT_PADDLE_SHIFT,
      y: INITIAL_PADDLE_POSITION,
      score: 0,
    },
    player2: {
      x: DEFAULT_PADDLE_SHIFT,
      y: INITIAL_PADDLE_POSITION,
      score: 0,
    },
    ball: {
      x: GAME_WINDOW_WIDTH / 2,
      y: GAME_WINDOW_HEIGHT / 2,
    }
  })

  ws.onmessage = function onWsMessage(event) {
    const data = JSON.parse(event.data)
    setGameState(data)
  }

  useKeypress(
    'Space',
    (e) =>
      e.type === 'keyup' &&
      ws.send(
        JSON.stringify({
          type: 'start',
        }),
      ),
  )

  useKeypress('ArrowUp', (e) =>
    ws.send(
      JSON.stringify({
        type: e.type,
        actor: 'p1',
        target: 'up',
      }),
    ),
  )

  useKeypress('ArrowDown', (e) =>
    ws.send(
      JSON.stringify({
        type: e.type,
        actor: 'p1',
        target: 'down',
      }),
    ),
  )

  useKeypress('w', (e) =>
    ws.send(
      JSON.stringify({
        type: e.type,
        actor: 'p2',
        target: 'up',
      }),
    ),
  )

  useKeypress('s', (e) =>
    ws.send(
      JSON.stringify({
        type: e.type,
        actor: 'p2',
        target: 'down',
      }),
    ),
  )

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Text as="h1">RePonGO</Text>
      <Text as="h2" my={20}>
        {player1.score} - {player2.score}
      </Text>
      <Box
        width={GAME_WINDOW_WIDTH}
        height={GAME_WINDOW_HEIGHT}
        position="relative"
        bg="black"
        borderRadius={10}
      >
        <Paddle top={player1.y} left={player1.x} />
        <Ball top={ball.y} left={ball.x} />
        <Paddle top={player2.y} right={DEFAULT_PADDLE_SHIFT} />
      </Box>
    </Box>
  )
}
