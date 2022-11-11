import { TouchableOpacity } from './TouchableOpacity'
import { Body } from '../typography/Body'
import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps, SvgComponent } from '../../types/ui'
import { renderIcon } from '../../utils/ui'

export type ButtonType = 'pumpkin' | 'light'

export interface ButtonProps {
  onPress: (data: any) => void
  title: string
  disabled?: boolean
  style?: object
  type?: ButtonType
  icon?: SvgComponent | JSX.Element
}

export const Button = memo<ButtonProps & LayoutItemProps>(
  ({ onPress, title, disabled = false, icon, ...props }) => {
    return (
      <Wrapper onPress={onPress} disabled={disabled} {...props}>
        {icon && <Centered>{renderIcon(icon)}</Centered>}
        <ButtonTitle>{title}</ButtonTitle>
      </Wrapper>
    )
  }
)

export const Centered = styled.View`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonTitle = styled(Body)`
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

const Wrapper = styled(TouchableOpacity)`
  display: flex;
  border-radius: 8px;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.charcoal};
`
