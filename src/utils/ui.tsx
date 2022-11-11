import { isValidElement } from 'react'
import { Dimensions, Platform } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { DefaultTheme } from 'styled-components/native'
import { ColorKey, IconProp, Maybe } from '../types/ui'

export const isIos = Platform.OS === 'ios'
export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height

function isElement(icon: IconProp): icon is JSX.Element {
  return isValidElement(icon)
}

export const renderIcon = (Icon: IconProp, props?: SvgProps) =>
  isElement(Icon) ? Icon : <Icon {...props} />

export const getColorValue = (colorKey: Maybe<ColorKey>, theme: DefaultTheme) =>
  colorKey ? theme.colors[colorKey] : undefined

export const upFirstSymbol = (str: string) =>
  str.replace(/( |^)[a-z]/g, function (x) {
    return x.toUpperCase()
  })
