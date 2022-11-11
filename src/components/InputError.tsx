import { Body } from './typography/Body'
import styled from 'styled-components/native'

export const InputError = styled(Body)`
  color: ${({ theme }) => theme.colors.pantone};
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
`
