import styled from 'styled-components'

import Box, { BoxProps } from './Box'

export const DEFAULT_PADDLE_WIDTH = 20
export const DEFAULT_PADDLE_HEIGHT = 100
export const DEFAULT_PADDLE_SHIFT = 50

export interface PaddleProps extends BoxProps {}

const Paddle = styled(Box)<PaddleProps>``

Paddle.defaultProps = {
  bg: 'white',
  position: 'absolute',
  width: `${DEFAULT_PADDLE_WIDTH}px`,
  height: `${DEFAULT_PADDLE_HEIGHT}px`,
}

export default Paddle
