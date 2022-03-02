import styled from 'styled-components'

import Box, { BoxProps } from './Box'

export interface BallProps extends BoxProps {}

const Ball = styled(Box)`
  transition: top 0.1s linear, left 0.1s linear;
`

Ball.defaultProps = {
  bg: 'white',
  position: 'absolute',
  borderRadius: '50%',
}

export default Ball
