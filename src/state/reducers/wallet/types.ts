import Decimal from 'decimal.js'
import { TransactionType } from '../../../components/TransictionItem'
import { EthersWallet } from '../../../utils/fromMnemonic'
import { ConnectClient } from '../../sagas/wallet/api'

export type WalletState = {
  mnemonic: string
  address: string
  privateKey: string
  publicKey: string
  path: string
  balance: { eth: string; usd: string; ethBalance: Decimal; ethPrice: number }
  transactions: TransactionType[]
  account: EthersWallet
  fee: {
    gasPriceWei: string
    gasPriceUsd: Decimal
    gasAmount: number
    fee: string
  }
  message: string
  id: number
  client: ConnectClient
}
