import { useContext, useState } from 'react'

import Box from './Box'
import Text from './Text'
import Paddle from './Paddle'
import Ball from './Ball'
import WsContext from '../contexts/websocket'
import useKeypress from '../hooks/use-keypress'
import { GameStatus, GameState, defaultGameState } from '../utils/state'

const GAME_WINDOW_WIDTH = 800
const GAME_WINDOW_HEIGHT = 600

export default function Game() {
  const { connection: ws, isConnected } = useContext(WsContext)
  const [{ player1, player2, ball, status }, setGameState] =
    useState<GameState>(defaultGameState)

  ws.onmessage = function onWsMessage(event) {
    const data = JSON.parse(event.data)
    setGameState(data)
  }

  useKeypress(
    'Space',
    (e) =>
      e.type === 'keyup' &&
      status !== GameStatus.IN_PROGRESS &&
      ws.send(
        JSON.stringify({
          type: status === GameStatus.GAME_OVER ? 'restart' : 'start',
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
      <Box bg="black" color="white" px={10} border="1px dashed">
        <Text as="h1" textAlign="center" my={20}>
          RePonGO
        </Text>
      </Box>
      {isConnected ? (
        <>
          <Box
            width={GAME_WINDOW_WIDTH}
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            my={20}
          >
            <Text>🠕 = UP | 🠗 = DOWN</Text>
            <Text as="h1">
              {player1.score} - {player2.score}
            </Text>
            <Text>W = UP | S = DOWN</Text>
          </Box>
          <Box
            width={GAME_WINDOW_WIDTH}
            height={GAME_WINDOW_HEIGHT}
            position="relative"
            bg="black"
          >
            {status === GameStatus.NOT_STARTED && (
              <Box
                width="100%"
                bg="white"
                position="absolute"
                left="0"
                top={GAME_WINDOW_HEIGHT / 2 - 18}
                p={10}
              >
                <Text fontSize={26} textAlign="center">
                  press [space] to start
                </Text>
              </Box>
            )}
            {status === GameStatus.GAME_OVER && (
              <Box
                width="100%"
                bg="white"
                position="absolute"
                left="0"
                top={GAME_WINDOW_HEIGHT / 2 - 18}
                p={10}
              >
                <Text fontSize={26} textAlign="center">
                  {player1.score > player2.score
                    ? 'player1 wins!'
                    : 'player2 wins!'}
                  {' | press [space] to restart'}
                </Text>
              </Box>
            )}
            {status === GameStatus.IN_PROGRESS && (
              <>
                <Paddle
                  top={player1.y}
                  left={player1.x}
                  width={player1.width}
                  height={player1.height}
                />
                <Ball
                  top={ball.y}
                  left={ball.x}
                  width={ball.radius * 2}
                  height={ball.radius * 2}
                />
                <Paddle
                  top={player2.y}
                  left={player2.x}
                  width={player2.width}
                  height={player2.height}
                />
              </>
            )}
          </Box>
        </>
      ) : (
        <Text mt={20}>connecting to game server...</Text>
      )}
    </Box>
  )
}
