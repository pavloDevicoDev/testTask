import { FC } from 'react'
import { FlexStyle, TextStyle, ViewProps } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { DefaultTheme } from 'styled-components/native'
import lightThemeColors from '../theme/darkThemeColors'

export type ThemeColors = typeof lightThemeColors

export type SvgComponent = FC<SvgProps>
export type IconProp = SvgComponent | JSX.Element
export type Maybe<T> = T | null | undefined

export type ColorKey = keyof DefaultTheme['colors']

export type FlexProps = Pick<
  FlexStyle,
  'flex' | 'alignItems' | 'alignSelf' | 'justifyContent' | 'flexWrap'
>

export type LayoutItemProps = Pick<ViewProps, 'style'> &
  FlexProps &
  Pick<FlexStyle, 'flex' | 'overflow'>

export type TextColorProps = { color?: ColorKey }

export type BaseTextProps = Pick<TextStyle, 'textAlign'> &
  Pick<TextStyle, 'fontWeight'> &
  FlexProps &
  TextColorProps & { hasMarginBottom?: boolean }

export interface SvgIconProps {
  xmlns?: string
  xmlnsXlink?: string
}
