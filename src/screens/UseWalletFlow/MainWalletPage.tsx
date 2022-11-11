import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo, useCallback, useEffect } from 'react'
import styled from 'styled-components/native'
import ROUTES from '../../routes/RouteNames'
import { Title } from '../../components/typography/Title'
import { Button } from '../../components/buttons/Button'
import { FlatList } from 'react-native-gesture-handler'
import { TransactionItem } from '../../components/TransictionItem'
import { BigTitle } from '../../components/typography/BigTitle'
import { BodyLarge } from '../../components/typography/BodyLarge'
import EthereumIcon from '../../assets/icons/EthereumIcon'
import colors from '../../theme/colors'
import { MainHeader } from '../../components/MainHeader'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../state/reducers/types'
import { getBalancesAction } from '../../state/actions/wallet/walletActions'
import { RotationBox } from '../../components/RotationBox'
import { LoaderBox } from '../../components/LoaderBox'
import { NA_STRING } from '../../constants/static'

function MainWalletPage() {
  const dispatch = useDispatch()
  const { address, balance, transactions }: State['wallet'] = useSelector(
    (state: State) => state.wallet
  )
  const { navigate } = useNavigation<NavigationProp<any>>()
  const handleClickCreateTransaction = useCallback(() => {
    navigate(ROUTES.CreateTransactionPage)
  }, [])

  const handleClickConnect = useCallback(() => {}, [])

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (address) {
        dispatch(getBalancesAction.request(address))
      }
    }, 5000)

    return () => {
      clearInterval(timerId)
    }
  }, [address])

  return (
    <Wrapper>
      <MainHeader address={address} />
      <UpPart>
        <StyledIcon color={colors.black} />
        <LoaderBox isLoading={balance.eth === NA_STRING} withFlex>
          <BigTitle hasMarginBottom>{balance.eth} ETH</BigTitle>
        </LoaderBox>
        {balance.usd !== NA_STRING ? (
          <BodyLarge hasMarginBottom>${balance.usd} USD</BodyLarge>
        ) : null}
      </UpPart>
      <DownPart>
        <StyledButtonBlock>
          <StyledButton
            onPress={handleClickCreateTransaction}
            title="Create transaction"
          />
          <RotationBox disabled>
            <Button onPress={handleClickConnect} title="Connect" disabled />
          </RotationBox>
        </StyledButtonBlock>
        <ListWrapper>
          <StyledTitle>Activities</StyledTitle>
          <LoaderBox isLoading={!transactions.length} withFlex>
            <FlatList
              data={transactions}
              renderItem={(item) => <TransactionItem transaction={item.item} />}
              showsHorizontalScrollIndicator={false}
            />
          </LoaderBox>
        </ListWrapper>
      </DownPart>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  background-color: ${({ theme }) => theme.colors.mineShaft};
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
`
const ListWrapper = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
`

const StyledButtonBlock = styled.View`
  width: 100%;
  padding: 0 16px;
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.oceanBlue};
`

const UpPart = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px;
  flex: 1;
`

const DownPart = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  flex: 1.5;
`

const StyledTitle = styled(Title)`
  padding: 24px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.charcoal};
`

const StyledIcon = styled(EthereumIcon)`
  margin-bottom: 24px;
`

export default memo(MainWalletPage)
