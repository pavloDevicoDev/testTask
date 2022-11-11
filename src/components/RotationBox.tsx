import { memo, useCallback } from 'react'
import styled from 'styled-components/native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
} from 'react-native-reanimated'
import { TouchableOpacity } from './buttons/TouchableOpacity'
import { StyleProp, ViewStyle } from 'react-native'

type Props = {
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  children: JSX.Element
}

export const RotationBox = memo(
  ({ children, style, disabled = false }: Props) => {
    const rotation = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotateZ: `${rotation.value}deg` }],
      }
    })

    const handlePressView = useCallback(() => {
      if (disabled) {
        rotation.value = withSequence(
          withTiming(-2, { duration: 50 }),
          withRepeat(withTiming(2, { duration: 100 }), 4, true),
          withTiming(0, { duration: 50 })
        )
      }
    }, [disabled])

    return (
      <Wrapper onPress={handlePressView}>
        <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
      </Wrapper>
    )
  }
)

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
`
