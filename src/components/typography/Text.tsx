import styled from 'styled-components/native'
import { BaseTextProps } from '../../types/ui'
import { getColorValue } from '../../utils/ui'

export const Text = styled.Text<BaseTextProps>`
  color: ${({ color, theme }) =>
    color ? getColorValue(color, theme) : theme.colors.midGray};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ fontWeight }) => (fontWeight ? `font-weight: ${fontWeight}` : 500)};
  ${({ hasMarginBottom }) => (hasMarginBottom ? `margin-bottom: 16px;` : '')};
  font-family: MontserratMedium;
`
