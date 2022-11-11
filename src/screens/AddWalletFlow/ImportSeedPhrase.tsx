import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useWatch, useForm } from 'react-hook-form'
import styled from 'styled-components/native'
import ROUTES from '../../routes/RouteNames'
import { Header } from '../../components/Header'
import { TitleSmall } from '../../components/typography/TitleSmall'
import { IconButton } from '../../components/buttons/IconButton'
import BackIcon from '../../assets/icons/BackIcon'
import { Body } from '../../components/typography/Body'
import { Button } from '../../components/buttons/Button'
import { TextInput } from '../../components/input/Input'
import validationSchema from '../../utils/validation'
import CopyIcon from '../../assets/icons/CopyIcon'
import { SecretPhrase } from '../../components/SecretPhrase'
import { getPhrases } from '../../utils/getPhrases'
import { RotationBox } from '../../components/RotationBox'
import { ACCOUNT_INDEX } from '../../config/config'
import { fromMnemonic } from '../../utils/fromMnemonic'
import { loginAction } from '../../state/actions/wallet/walletActions'
import { useDispatch } from 'react-redux'
import { LoaderBox } from '../../components/LoaderBox'

function ImportSeedPhrase() {
  const [barCodeValue, setBarCodeValue] = useState<{
    phrases: string[]
    error?: string
  }>({ phrases: [] })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const {
    control,
    formState: { errors, isValid },
    setValue,
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      seedPhrase: '',
    },
    mode: 'onChange',
  })

  const seedPhrase = useWatch({
    control,
    name: 'seedPhrase',
  })

  useEffect(() => {
    if (seedPhrase) {
      const newArray = getPhrases(seedPhrase)
      setBarCodeValue(newArray)
    }
  }, [seedPhrase])

  const disabled = useMemo(() => !isValid, [isValid])

  const { goBack, navigate } = useNavigation<NavigationProp<any>>()

  const handleClickNext = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      const { seedPhrase } = getValues()
      dispatch(loginAction(fromMnemonic(seedPhrase, ACCOUNT_INDEX)))
      setIsLoading(false)
      navigate(ROUTES.MainPage)
    }, 0)
  }, [])

  const handlePastClipboard = useCallback(async () => {
    const text = await Clipboard.getStringAsync()
    setValue('seedPhrase', text, { shouldValidate: true })
  }, [])

  const onBack = useCallback(() => {
    goBack()
  }, [goBack])

  return (
    <Wrapper>
      <Header LeftPart={<StyledIconButton icon={BackIcon} onPress={onBack} />}>
        <TitleSmall>Import from seed</TitleSmall>
      </Header>
      <InfoBlock>
        <UpPart>
          <Body hasMarginBottom>Enter your secret phrase</Body>
          <Controller
            name="seedPhrase"
            control={control}
            rules={validationSchema.seedPhrase}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="SECRET PHRASE"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.seedPhrase?.message}
                multiline
              />
            )}
          />
          <Button
            onPress={handlePastClipboard}
            title="Paste from clipboard"
            icon={CopyIcon}
          />
          <SecretPhrase data={barCodeValue} />
        </UpPart>
        <DownPart>
          <RotationBox disabled={disabled}>
            <LoaderBox isLoading={isLoading}>
              <StyledButton
                onPress={handleSubmit(handleClickNext)}
                title="Next"
                disabled={disabled}
              />
            </LoaderBox>
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
  justify-content: center;
`

export default memo(ImportSeedPhrase)
