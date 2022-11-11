import { memo } from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'
import colors from '../theme/colors'

type Props = {
  size?: 'large' | 'small'
  color?: string
  isLoading?: boolean
  withFlex?: boolean
  children: JSX.Element
  style?: StyleProp<ViewStyle>
}

export const LoaderBox = memo(
  ({
    size = 'large',
    color,
    isLoading = false,
    children,
    withFlex = false,
    style,
  }: Props) => {
    return (
      <Wrapper withFlex={withFlex} style={style}>
        {isLoading ? (
          <ActivityIndicator size={size} color={color || colors.white} />
        ) : (
          children
        )}
      </Wrapper>
    )
  }
)

const Wrapper = styled.View<{ withFlex?: boolean }>`
  ${({ withFlex }) => (withFlex ? 'flex: 1;' : '')}
  justify-content: center;
`
