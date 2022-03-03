import styled from 'styled-components'

import Box, { BoxProps } from './Box'

export interface PaddleProps extends BoxProps {}

const Paddle = styled(Box)<PaddleProps>`
  transition: top 0.1s linear 0s;
`

Paddle.defaultProps = {
  bg: 'white',
  position: 'absolute',
}

export default Paddle
