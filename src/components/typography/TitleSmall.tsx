import styled from 'styled-components/native'

import { Text } from './Text'

export const TitleSmall = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${({ color, theme }) => color || theme.colors.white};
  font-family: MontserratBold;
`
