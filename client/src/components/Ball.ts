import styled from 'styled-components'

import Box, { BoxProps } from './Box'

export const DEFAULT_BALL_RADIUS = 10

export interface BallProps extends BoxProps {}

const Ball = styled(Box)``

Ball.defaultProps = {
  bg: 'white',
  position: 'absolute',
  width: `${DEFAULT_BALL_RADIUS * 2}px`,
  height: `${DEFAULT_BALL_RADIUS * 2}px`,
  borderRadius: '50%',
}

export default Ball
