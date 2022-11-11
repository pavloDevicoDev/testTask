import { MORALIS_API_KEY } from '../../../config/config'
import { web3 } from '../../../utils/web3'

export type MoralisTransaction = {
  value: string
  from_address: string
  to_address: string
  receipt_status: '1' | '0'
  hash: string
}

export const getBalance = (address: string) => web3.eth.getBalance(address)
export const getGasPrice = () => web3.eth.getGasPrice()
export const estimateGas = ({
  to,
  from,
  amount,
}: {
  to: string
  from: string
  amount: string
}) =>
  web3.eth.estimateGas({ to, from, value: web3.utils.toWei(amount, 'ether') })

export const getEthPrice = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
  )
  const pricePaylaod: { ethereum: { usd: number } } = await response.json()

  return pricePaylaod.ethereum.usd
}

export const getTransactionsList = async (address: string) => {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}?chain=eth&limit=10`,
    { headers: { 'X-API-Key': MORALIS_API_KEY } }
  )
  const transactionsResult = await response.json()

  return transactionsResult.result as MoralisTransaction[]
}
