import { useState } from 'react'
import Box from './Box'
import Text from './Text'
import Paddle, {
  DEFAULT_PADDLE_HEIGHT,
  DEFAULT_PADDLE_SHIFT,
} from './Paddle'

const GAME_WINDOW_WIDTH = 800
const GAME_WINDOW_HEIGHT = 600
const INITIAL_PADDLE_POSITION =
  GAME_WINDOW_HEIGHT / 2 - DEFAULT_PADDLE_HEIGHT / 2

export default function Game() {
  const [p1Score, _setP1Score] = useState(0)
  const [p2Score, _setP2Score] = useState(0)
  const [leftPaddleYPosition, _setLeftPaddleYPosition] = useState(
    INITIAL_PADDLE_POSITION,
  )
  const [rightPaddleYPosition, _setRightPaddlePosition] = useState(
    INITIAL_PADDLE_POSITION,
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
      <Text as="h2" my={20}>{p1Score} - {p2Score}</Text>
      <Box
        width={GAME_WINDOW_WIDTH}
        height={GAME_WINDOW_HEIGHT}
        position="relative"
        bg="black"
        borderRadius={10}
      >
        <Paddle top={leftPaddleYPosition} left={DEFAULT_PADDLE_SHIFT} />
        <Paddle top={rightPaddleYPosition} right={DEFAULT_PADDLE_SHIFT} />
      </Box>
    </Box>
  )
}
