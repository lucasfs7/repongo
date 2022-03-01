import styled from 'styled-components'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
} from 'styled-system'

export interface BoxProps
  extends LayoutProps,
    FlexboxProps,
    PositionProps,
    ColorProps,
    BorderProps {}

const Box = styled.div<BoxProps>`
  ${layout}
  ${flexbox}
  ${position}
  ${color}
  ${border}
`

export default Box
