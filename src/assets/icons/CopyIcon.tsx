import { memo } from 'react'
import Svg, { Path, Rect, SvgProps } from 'react-native-svg'
import { SvgIconProps } from '../../types/ui'

function CopyIcon({ color, ...props }: SvgProps & SvgIconProps) {
  return (
    <Svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x="0.986816"
        y="4.75"
        width="10.5"
        height="10.5"
        rx="1.25"
        stroke="white"
        stroke-width="1.5"
      />
      <Path
        d="M4.23682 3V3C4.23682 1.89543 5.13225 1 6.23682 1H13.2368C14.3414 1 15.2368 1.89543 15.2368 3V10C15.2368 11.1046 14.3414 12 13.2368 12V12"
        stroke="white"
        stroke-width="1.5"
      />
    </Svg>
  )
}

export default memo(CopyIcon)
