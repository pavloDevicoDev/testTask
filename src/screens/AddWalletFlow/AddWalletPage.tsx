import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo, useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components/native'
import ROUTES from '../../routes/RouteNames'
import Logo from '../../components/Logo'
import { Title } from '../../components/typography/Title'
import { Body } from '../../components/typography/Body'
import { Button } from '../../components/buttons/Button'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { RotationBox } from '../../components/RotationBox'

function AddWalletPage() {
  const { navigate } = useNavigation<NavigationProp<any>>()

  const flex = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      flex: withTiming(flex.value, {
        duration: 500,
        easing: Easing.bezier(0, 0.1, 0.3, 0.5),
      }),
    }
  })

  const handleImportWallet = useCallback(() => {
    navigate(ROUTES.ImportWallet)
  }, [])

  const handleCreateWallet = useCallback(() => {}, [])

  useEffect(() => {
    flex.value = withSpring(4)
  }, [])

  return (
    <Wrapper>
      <StyledLogo>
        <Logo />
      </StyledLogo>
      <InfoBlock style={animatedStyles}>
        <UpPart>
          <Title hasMarginBottom>Welcome to XDEFI wallet</Title>
          <Body>Let’s get you on board!</Body>
        </UpPart>
        <DownPart>
          <Body>By proceeding, you agree to XDEFI</Body>
          <Row>
            <StyledBlueBody>Terms </StyledBlueBody>
            <Body>and </Body>
            <StyledBlueBody>Privacy policy</StyledBlueBody>
          </Row>
          <RotationBox disabled>
            <StyledBlueButton
              onPress={handleCreateWallet}
              title="Create a new wallet"
              disabled
            />
          </RotationBox>
          <Button onPress={handleImportWallet} title="Import a wallet" />
        </DownPart>
      </InfoBlock>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black};
`

const StyledLogo = styled.View`
  flex: 1;
`

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`

const UpPart = styled.View`
  width: 100%;
  align-items: center;
`

const DownPart = styled.View`
  width: 100%;
  align-items: center;
`

const InfoBlock = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colors.mineShaft};
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  padding: 32px 16px 16px 16px;
`

const StyledBlueButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.oceanBlue};
`

const StyledBlueBody = styled(Body)`
  color: ${({ theme }) => theme.colors.blue};
`

export default memo(AddWalletPage)
