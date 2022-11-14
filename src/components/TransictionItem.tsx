import { memo, useCallback } from 'react'
import styled from 'styled-components/native'
import { Body } from './typography/Body'
import { TitleSmall } from './typography/TitleSmall'
import { Linking } from 'react-native'
import TransferIcon from '../assets/icons/TransferIcon'
import colors from '../theme/colors'
import { screenWidth } from '../utils/ui'
import Animated, {
  StretchOutY,
  StretchInY,
  Layout,
} from 'react-native-reanimated'

export type TransactionType = {
  status: boolean
  account: string
  fromAddress: string
  toAddress: string
  value: string
  usd: string
  hash: string
}

const formatAddress = (address: string) => {
  return address.substring(0, 4) + '..' + address.substring(address.length - 4)
}

export const TransactionItem = memo(
  ({ transaction }: { transaction: TransactionType }) => {
    const income = transaction.toAddress === transaction.account
    const sign = income ? '+' : '-'
    const url = `https://etherscan.io/tx/${transaction.hash}`

    const handleOpenUrl = useCallback(async () => {
      const isSupported = await Linking.canOpenURL(url)
      if (isSupported) {
        Linking.openURL(url)
      }
    }, [url])

    return (
      <Container
        style={[{ width: screenWidth }]}
        entering={StretchInY}
        exiting={StretchOutY}
        layout={Layout.springify()}
      >
        <Row onTouchEnd={handleOpenUrl}>
          <StyledIcon
            color={transaction.status ? colors.teal : colors.pantone}
          />
          <InfoBlock>
            <TitleSmall>{income ? 'RECEIVE' : 'SEND'}</TitleSmall>
            <Row>
              <StyledBody success={income}>
                {formatAddress(transaction.fromAddress)}:
              </StyledBody>
              <Body>{formatAddress(transaction.toAddress)}</Body>
            </Row>
          </InfoBlock>
        </Row>
        <InfoBlock>
          <CoinBlock>
            {sign}
            {transaction.value} ETH
          </CoinBlock>
          <CurrencyBlock>
            {sign}
            {transaction.usd} USD
          </CurrencyBlock>
        </InfoBlock>
      </Container>
    )
  }
)

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const InfoBlock = styled.View`
  justify-content: space-between;
  width: auto;
`

const Container = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 74px;
  border: 1px solid ${({ theme }) => theme.colors.mineShaft};
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.black};
`

const StyledIcon = styled(TransferIcon)`
  margin-right: 8px;
`

const StyledBody = styled(Body)<{ success?: boolean }>`
  color: ${({ success, theme }) =>
    success ? theme.colors.teal : theme.colors.pantone};
`

const CoinBlock = styled(TitleSmall)``

const CurrencyBlock = styled(Body)``
