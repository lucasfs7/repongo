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
  space,
  SpaceProps,
} from 'styled-system'

export interface BoxProps
  extends LayoutProps,
    FlexboxProps,
    PositionProps,
    ColorProps,
    BorderProps,
    SpaceProps {}

const Box = styled.div<BoxProps>`
  ${layout}
  ${flexbox}
  ${position}
  ${color}
  ${border}
  ${space}
`

export default Box
