import styled from 'styled-components'
import { space, SpaceProps, typography, TypographyProps } from 'styled-system'

export interface TextProps extends TypographyProps, SpaceProps {}

const Text = styled.p<TextProps>`
  ${typography}
  ${space}
`

Text.defaultProps = {
  my: 0,
}

export default Text
