import 'react-native-get-random-values'
import '@ethersproject/shims'
import { Wallet } from 'ethers'

export type EthersWallet = Wallet

export const derivationPath = "m/44'/60'/0'/0/"

export const generateDerivationPath = (index: number) => derivationPath + index

export function fromMnemonic(mnemonic: string, index = 0) {
  const path = generateDerivationPath(index)
  const account = Wallet.fromMnemonic(mnemonic, path)

  const { address, privateKey, publicKey } = account

  return {
    mnemonic,
    address,
    privateKey,
    publicKey,
    path,
    account,
  }
}
