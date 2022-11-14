import { AuthClient } from '@walletconnect/auth-client'
import { MORALIS_API_KEY, WALLET_CONNECT_ID } from '../../../config/config'
import { web3 } from '../../../utils/web3'
import Pino from 'pino'

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

export type ConnectClient = Awaited<ReturnType<typeof AuthClient['init']>>

export const initAuthClient = (address: string) =>
  AuthClient.init({
    projectId: WALLET_CONNECT_ID,
    iss: `did:pkh:eip155:1:${address}`,
    metadata: {
      name: 'XDEFI Wallet',
      description: 'ETH Wallet',
      url: 'https://www.xdefi.io/',
      icons: [
        'https://www.xdefi.io/wp-content/themes/xdefi/assets/dist/images/logos/site-logo-icon.svg',
      ],
    },
    logger: Pino(),
  })

export const pair = async (client: ConnectClient, uri: string) =>
  await client.core.pairing.pair({ uri })

export const respond = async (
  client: ConnectClient,
  id: number,
  signature: string
) =>
  await client.respond({
    id: id,
    signature: {
      s: signature,
      t: 'eip191',
    },
  })
