import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo, useCallback, useEffect } from 'react'
import styled from 'styled-components/native'
import ROUTES from '../../routes/RouteNames'
import Logo from '../../components/Logo'
import { TouchableOpacity } from '../../components/buttons/TouchableOpacity'

function LoadingPage() {
  const { navigate } = useNavigation<NavigationProp<any>>()

  useEffect(() => {
    setTimeout(() => {
      navigate(ROUTES.AddNewWallet)
    }, 500)
  }, [])

  const handleClickScreen = useCallback(() => {
    navigate(ROUTES.AddNewWallet)
  }, [])

  return (
    <TouchableOpacity onPress={handleClickScreen}>
      <Wrapper>
        <Logo />
      </Wrapper>
    </TouchableOpacity>
  )
}

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1c1e1f;
`

export default memo(LoadingPage)
