import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo, useCallback } from 'react'
import styled from 'styled-components/native'
import ROUTES from '../../routes/RouteNames'
import { Title } from '../../components/typography/Title'
import { Header } from '../../components/Header'
import { TitleSmall } from '../../components/typography/TitleSmall'
import { IconButton } from '../../components/buttons/IconButton'
import BackIcon from '../../assets/icons/BackIcon'
import { Body } from '../../components/typography/Body'
import { Button } from '../../components/buttons/Button'

function ImportWalletPage() {
  const { goBack, navigate } = useNavigation<NavigationProp<any>>()

  const handleClickImportSeed = useCallback(() => {
    navigate(ROUTES.ImportSeedPhrase)
  }, [])

  const handleClickImportQRCode = useCallback(() => {
    navigate(ROUTES.ImportQRWallet)
  }, [])

  return (
    <Wrapper>
      <Header LeftPart={<StyledIconButton icon={BackIcon} onPress={goBack} />}>
        <TitleSmall>Protect your wallet</TitleSmall>
      </Header>
      <InfoBlock>
        <UpPart>
          <Title hasMarginBottom>Import your XDEFI wallet</Title>
          <Body>Your can choose between two opstions</Body>
        </UpPart>
        <DownPart>
          <Button onPress={handleClickImportSeed} title="Import from seed" />
          <Button onPress={handleClickImportQRCode} title="Scan a QR code" />
        </DownPart>
      </InfoBlock>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.mineShaft};
`

const StyledIconButton = styled(IconButton)`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.charcoal};
`

const InfoBlock = styled.View`
  display: flex;
  background-color: ${({ theme }) => theme.colors.mineShaft};
  flex: 1;
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  padding: 16px;
`

const UpPart = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
`

const DownPart = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
`

export default memo(ImportWalletPage)
