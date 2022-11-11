import 'styled-components/native'

import { ThemeColors } from '../ui'

export type ThemeType = 'dark'
declare module 'styled-components/native' {
  export interface DefaultTheme {
    type: ThemeType
    colors: ThemeColors
  }
}

declare module 'base-64' {
  export function decode(): any
  export function encode(): any
}
