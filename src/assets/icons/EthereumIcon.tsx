import { memo } from 'react'
import Svg, { Polygon, SvgProps } from 'react-native-svg'
import { SvgIconProps } from '../../types/ui'

function EthereumIcon({ color = 'black', ...props }: SvgProps & SvgIconProps) {
  return (
    <Svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Polygon points="19.12 12.225 12 0 4.875 12.225 12 16.575" fill={color} />
      <Polygon
        points="12 24 19.125 13.622 12 17.972 4.875 13.622"
        fill={color}
      />
    </Svg>
  )
}

export default memo(EthereumIcon)
