import { memo, useCallback } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from '../types/ui'
import { Title } from './typography/Title'
import { Body } from './typography/Body'
import CopyIcon from '../assets/icons/CopyIcon'
import { TouchableOpacity } from './buttons/TouchableOpacity'
import * as Clipboard from 'expo-clipboard'
import { ToastAndroid } from 'react-native'

interface HeaderProps {
  LeftPart?: JSX.Element
  RightPart?: JSX.Element
  children?: JSX.Element
  address: string
}

export const MainHeader = memo((props: HeaderProps & LayoutItemProps) => {
  const { address } = props

  const handleCopyClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(address)
    ToastAndroid.show('Copied', ToastAndroid.SHORT)
  }, [address])

  return (
    <Container {...props}>
      <Title>Your wallet</Title>
      <TouchableOpacity onPress={handleCopyClipboard}>
        {address && (
          <Row>
            <StyledBody numberOfLines={1}>{address}</StyledBody>
            <CopyIcon />
          </Row>
        )}
      </TouchableOpacity>
    </Container>
  )
})

const StyledBody = styled(Body)`
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 4px;
`

const Container = styled.View`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-bottom: 0;
  overflow: hidden;
  margin-bottom: 24px;
  margin-top: 8px;
`

const Row = styled.View`
  display: flex;
  flex-direction: row;
`
