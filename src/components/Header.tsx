import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from '../types/ui'

interface HeaderProps {
  LeftPart?: JSX.Element
  RightPart?: JSX.Element
  children?: JSX.Element
}

export const Header = memo((props: HeaderProps & LayoutItemProps) => {
  const {
    LeftPart = <StyledView />,
    RightPart = <StyledView />,
    children,
    ...restProps
  } = props
  return (
    <Container {...restProps}>
      {LeftPart}
      {children}
      {RightPart}
    </Container>
  )
})

const StyledView = styled.View`
  height: 44px;
  width: 44px;
`

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  width: 100%;
  margin-top: 12px;
  padding: 16px;
  padding-bottom: 0;
`
