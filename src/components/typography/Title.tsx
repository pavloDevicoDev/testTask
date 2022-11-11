import styled from 'styled-components/native'

import { Text } from './Text'

export const Title = styled(Text).attrs({ bold: true })`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${({ color, theme }) => color || theme.colors.white};
  font-family: MontserratBold;
`
