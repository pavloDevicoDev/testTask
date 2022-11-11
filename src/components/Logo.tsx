import { memo } from 'react'
import styled from 'styled-components/native'
import XDEFILarge from '../assets/icons/XDEFILarge'

const Logo = () => {
  return (
    <Wrapper>
      <XDEFILarge />
    </Wrapper>
  )
}

const Wrapper = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  margin: auto;
`

export default memo(Logo)
