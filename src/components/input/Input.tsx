import { TouchableOpacity } from '../buttons/TouchableOpacity'
import { InputError } from '../InputError'
import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import { LayoutItemProps } from '../../types/ui'

export type TextInputProps = RNTextInputProps &
  LayoutItemProps & {
    label?: string
    error?: any
    rightAddon?: ReactNode
    onGainedFocus?: () => void
    onBlur?: () => void
    onPress?: () => void
    securedEntry?: boolean
    multiline?: boolean
  }

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      editable = true,
      rightAddon,
      onChangeText,
      value,
      onGainedFocus,
      onBlur,
      onPress,
      securedEntry = false,
      multiline = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const offset = useSharedValue(value ? 1 : 0)

    const handleFocus = useCallback(() => {
      offset.value = !value ? 1 : withTiming(0)

      if (onGainedFocus) {
        onGainedFocus()
      }
      setIsFocused(true)
    }, [value, onGainedFocus, offset])

    const handleBlur = useCallback(() => {
      offset.value = value ? 1 : withTiming(0)

      if (onBlur) {
        onBlur()
      }
      setIsFocused(false)
    }, [value, onBlur, offset])

    useEffect(() => {
      if (!isFocused && !value) {
        offset.value = 0
      } else {
        offset.value = 1
      }
    }, [value, isFocused, offset])

    const { style, ...rest } = props

    const mergedStyle = useMemo<StyleProp<ViewStyle>>(() => {
      if (!editable) {
        return [{ opacity: 0.5 }, style]
      }

      return style
    }, [editable, style])

    return (
      <InputBlock style={mergedStyle}>
        <TouchableOpacity disabled={!onPress} onPress={onPress}>
          {label ? <InputLabel>{label}</InputLabel> : null}
          <InputWrapper multiline={multiline}>
            <Input
              editable={editable}
              value={value}
              autoCorrect={false}
              testID={label}
              onChangeText={onChangeText}
              ref={ref}
              onBlur={handleBlur}
              onFocus={handleFocus}
              multiline={multiline}
              {...rest}
            />
            {rightAddon ? <IconContainer>{rightAddon}</IconContainer> : null}
          </InputWrapper>
          <ErrorBlock>
            {error ? (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <InputError>{error}</InputError>
              </Animated.View>
            ) : null}
          </ErrorBlock>
        </TouchableOpacity>
      </InputBlock>
    )
  }
)

const InputWrapper = styled.View<{ multiline?: boolean }>`
  height: ${({ multiline }) => (multiline ? '94px' : '50px')};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.oceanBlue};
`

const Input = styled.TextInput.attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.white,
  selectionColor: theme.colors.white,
}))`
  margin-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  color: ${({ theme }) => theme.colors.white};
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  ${({ multiline }) => (multiline ? 'text-align-vertical: top;' : null)};
`

const InputLabel = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
`

const IconContainer = styled.View`
  margin-right: 8px;
  justify-content: center;
`

const InputBlock = styled.View`
  width: 100%;
`

const ErrorBlock = styled.View`
  height: 30px;
`
