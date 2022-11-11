import { TouchableOpacity, TouchableOpacityProps } from './TouchableOpacity'
import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps, SvgComponent } from '../../types/ui'
import { renderIcon } from '../../utils/ui'

type Props = TouchableOpacityProps &
  LayoutItemProps & {
    icon: SvgComponent | JSX.Element
    iconColor?: string
    iconStyle?: object
  }

export const IconButton = memo<Props>(
  ({ icon, iconColor, iconStyle, ...props }) => {
    return (
      <Btn {...props}>
        {renderIcon(icon, { color: iconColor, ...iconStyle })}
      </Btn>
    )
  }
)

const Btn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
`
