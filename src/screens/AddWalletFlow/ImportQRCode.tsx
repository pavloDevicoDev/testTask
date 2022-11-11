import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo, useCallback, useState } from 'react'
import styled from 'styled-components/native'
import { Header } from '../../components/Header'
import { TitleSmall } from '../../components/typography/TitleSmall'
import { IconButton } from '../../components/buttons/IconButton'
import BackIcon from '../../assets/icons/BackIcon'
import { Button } from '../../components/buttons/Button'
import BarCodeScanner from '../../components/BarCodeScanner'
import ROUTES from '../../routes/RouteNames'
import { RotationBox } from '../../components/RotationBox'
import { BarCodeType } from '../../types/types'
import { loginAction } from '../../state/actions/wallet/walletActions'
import { fromMnemonic } from '../../utils/fromMnemonic'
import { ACCOUNT_INDEX } from '../../config/config'
import { useDispatch } from 'react-redux'
import { LoaderBox } from '../../components/LoaderBox'

function ImportQRCode() {
  const { goBack, navigate } = useNavigation<NavigationProp<any>>()
  const [barCodeValue, setBarCodeValue] = useState<BarCodeType>({
    phrases: [],
    rawValue: '',
  })
  const [scanned, setScanned] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const onBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleClickNext = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      dispatch(loginAction(fromMnemonic(barCodeValue.rawValue, ACCOUNT_INDEX)))
      setIsLoading(false)
      navigate(ROUTES.MainPage)
    }, 0)
  }, [barCodeValue.rawValue])

  return (
    <Wrapper>
      <Header LeftPart={<StyledIconButton icon={BackIcon} onPress={onBack} />}>
        <TitleSmall>Import from QR code</TitleSmall>
      </Header>
      <InfoBlock>
        <UpPart>
          <BarCodeScanner
            barCodeValue={barCodeValue}
            setBarCodeValue={setBarCodeValue}
            scanned={scanned}
            setScanned={setScanned}
          />
        </UpPart>
        <DownPart>
          <RotationBox disabled={!!barCodeValue.error || !scanned}>
            <StyledLoaderBox isLoading={isLoading}>
              <StyledButton
                onPress={handleClickNext}
                title="Next"
                disabled={!!barCodeValue.error || !scanned}
              />
            </StyledLoaderBox>
          </RotationBox>
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
const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.darkGray};
`

const InfoBlock = styled.View`
  display: flex;
  background-color: ${({ theme }) => theme.colors.mineShaft};
  flex: 1;
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  padding: 0 16px;
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

const StyledLoaderBox = styled(LoaderBox)`
  margin-bottom: 16px;
`

export default memo(ImportQRCode)
