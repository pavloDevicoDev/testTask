import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo, useCallback, useState } from 'react'
import styled from 'styled-components/native'
import { Header } from '../../components/Header'
import { TitleSmall } from '../../components/typography/TitleSmall'
import { IconButton } from '../../components/buttons/IconButton'
import ModalComponent from '../../components/ModalComponent'
import BackIcon from '../../assets/icons/BackIcon'
import { Button } from '../../components/buttons/Button'
import BarCodeScanner from '../../components/BarCodeScanner'
import { BarCodeType } from '../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { LoaderBox } from '../../components/LoaderBox'
import { State } from '../../state/reducers/types'
import { clearMessageAction, signAction, walletConnectPairAction } from '../../state/actions/wallet/walletActions'
import ROUTES from '../../routes/RouteNames'

function ConnectQRCode() {
  const { goBack, navigate } = useNavigation<NavigationProp<any>>()
  const [barCodeValue, setBarCodeValue] = useState<BarCodeType>({
    phrases: [],
    rawValue: '',
  })
  const { address, message, id, account } = useSelector((state: State) => state.wallet)
  const [scanned, setScanned] = useState<boolean>(false)
  const dispatch = useDispatch()

  const onBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleBarCodeValueChange = (barCode: BarCodeType) => {
    setBarCodeValue(barCode)
    const walletConnectUri = barCode.rawValue
    if (walletConnectUri.startsWith('wc:')) {
      dispatch(walletConnectPairAction.request({ uri: walletConnectUri, address }))
    }
  }

  const handleClose = () => {
    dispatch(clearMessageAction())
  }

  const handleAccept = async () => {
    if (message) {
      const signature = await account.signMessage(message)
      dispatch(signAction.request({ id, signature, address }))
      navigate(ROUTES.MainPage)
    }
  }

  return (
    <Wrapper>
      <Header LeftPart={<StyledIconButton icon={BackIcon} onPress={onBack} />}>
        <TitleSmall>Connect with WalletConnect</TitleSmall>
      </Header>
      <InfoBlock>
        <UpPart>
          <BarCodeScanner
            barCodeValue={barCodeValue}
            setBarCodeValue={handleBarCodeValueChange}
            scanned={scanned}
            setScanned={setScanned}
          />
        </UpPart>
        <DownPart>
          <StyledButton
            onPress={onBack}
            title="Back"
          />
        </DownPart>
      </InfoBlock>
      <ModalComponent questionText={message} isModalOpen={!!message} onClose={handleClose} onAccept={handleAccept} />
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mineShaft};
`

const StyledIconButton = styled(IconButton)`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.charcoal};
`
const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.darkGray};
`

const InfoBlock = styled.View`
  background-color: ${({ theme }) => theme.colors.mineShaft};
  flex: 1;
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  padding: 0 16px;
`

const UpPart = styled.View`
  width: 100%;
  align-items: center;
`

const DownPart = styled.View`
  width: 100%;
  align-items: center;
`

const StyledLoaderBox = styled(LoaderBox)`
  margin-bottom: 16px;
`


export default memo(ConnectQRCode)
