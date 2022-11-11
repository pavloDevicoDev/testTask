import styled from 'styled-components/native'

import { Text } from './Text'

export const BigTitle = styled(Text)`
  font-weight: 700;
  font-size: 36px;
  line-height: 40px;
  color: ${({ color, theme }) => color || theme.colors.white};
  font-family: MontserratBold;
`
