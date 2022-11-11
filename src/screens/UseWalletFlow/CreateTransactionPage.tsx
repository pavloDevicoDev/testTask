import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import { Header } from '../../components/Header'
import { TitleSmall } from '../../components/typography/TitleSmall'
import { IconButton } from '../../components/buttons/IconButton'
import BackIcon from '../../assets/icons/BackIcon'
import { Button } from '../../components/buttons/Button'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from '../../components/input/Input'
import ROUTES from '../../routes/RouteNames'
import validationSchema from '../../utils/validation'
import { ToastAndroid } from 'react-native'
import { RotationBox } from '../../components/RotationBox'
import { State } from '../../state/reducers/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  estimateGasAction,
  getBalancesAction,
} from '../../state/actions/wallet/walletActions'
import { web3 } from '../../utils/web3'
import { NA_STRING } from '../../constants/static'
import { screenWidth } from '../../utils/ui'
import { LoaderBox } from '../../components/LoaderBox'
import colors from '../../theme/colors'

function CreateTransactionPage() {
  const { goBack, navigate } = useNavigation<NavigationProp<any>>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const {
    balance,
    address,
    fee: { fee, gasAmount },
    privateKey,
  }: State['wallet'] = useSelector((state: State) => state.wallet)
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      address: '',
      amount: '',
    },
    mode: 'onChange',
  })
  const to = watch('address')
  const amount = watch('amount')

  const disabled = useMemo(() => !isValid, [isValid])

  const handleClickNext = useCallback(async () => {
    try {
      setIsLoading(true)

      const createTransaction = await web3.eth.accounts.signTransaction(
        {
          from: address,
          to,
          value: web3.utils.toWei(amount, 'ether'),
          gas: gasAmount.toString(),
        },
        privateKey
      )
      const createReceipt = await web3.eth.sendSignedTransaction(
        `${createTransaction.rawTransaction}`
      )
      ToastAndroid.show(
        `Transaction successful with hash: ${createReceipt.transactionHash}`,
        ToastAndroid.LONG
      )
      navigate(ROUTES.MainPage)
    } catch (err) {
      console.error(err)
    }
  }, [to, amount, address, gasAmount, privateKey])

  const onBack = useCallback(() => {
    goBack()
  }, [goBack])

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (address) {
        dispatch(getBalancesAction.request(address))
        if (to && amount && !Number.isNaN(parseFloat(amount)))
          dispatch(
            estimateGasAction.request({
              from: address,
              amount,
              to,
              ethPrice: balance.ethPrice,
            })
          )
      }
    }, 5000)

    return () => {
      clearInterval(timerId)
    }
  }, [to, amount])

  return (
    <Wrapper>
      <Header LeftPart={<StyledIconButton icon={BackIcon} onPress={onBack} />}>
        <TitleSmall>Send</TitleSmall>
      </Header>
      <InfoBlock>
        <UpPart>
          <Controller
            name="address"
            control={control}
            rules={validationSchema.address}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                label="To"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.address?.message}
              />
            )}
          />
          <BottomLine width={screenWidth} />
          <Controller
            name="amount"
            control={control}
            rules={validationSchema.amount}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                label={`Amount (Max: ${balance.eth})`}
                keyboardType="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.amount?.message}
              />
            )}
          />
        </UpPart>
        <DownPart>
          <NetworkFeeBlock width={screenWidth}>
            <FeeTitle>Network fee</FeeTitle>
            <FeePrice>${fee} USD</FeePrice>
          </NetworkFeeBlock>
          <RotationBox disabled={disabled}>
            <StyledLoaderBox isLoading={isLoading} color={colors.oceanBlue}>
              <StyledButton
                onPress={handleSubmit(handleClickNext)}
                title="Send"
                disabled={disabled || fee === NA_STRING}
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
  background-color: ${({ theme }) => theme.colors.oceanBlue};
`

const InfoBlock = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.black};
`

const UpPart = styled.View`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mineShaft};
  padding: 4px 16px;
  margin: 16px;
  border-radius: 8px;
`

const DownPart = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 16px;
`

const NetworkFeeBlock = styled.View<{ width?: number }>`
  display: flex;
  flex-direction: row;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.mineShaft};
  padding: 24px;
  margin-bottom: 16px;
`

const FeeTitle = styled(TitleSmall)`
  display: flex;
`

const FeePrice = styled(TitleSmall)`
  display: flex;
`

const BottomLine = styled.View<{ width?: number }>`
  border: 1px dashed ${({ theme }) => theme.colors.black};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`

const StyledTextInput = styled(TextInput)`
  margin-top: 16px;
`

const StyledLoaderBox = styled(LoaderBox)`
  margin-bottom: 16px;
`

export default memo(CreateTransactionPage)
