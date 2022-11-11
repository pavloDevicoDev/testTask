import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { SvgIconProps } from '../../types/ui'

function BackIcon({ color, ...props }: SvgProps & SvgIconProps) {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11 1.00012L4 8.00012L11 15.0001"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo(BackIcon)
