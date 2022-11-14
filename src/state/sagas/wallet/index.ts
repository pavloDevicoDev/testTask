import Decimal from 'decimal.js'
import { call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { eventChannel, EventChannel } from 'redux-saga'
import { TransactionType } from '../../../components/TransictionItem'

import {
  clearMessageAction,
  estimateGasAction,
  getBalancesAction,
  messageAction,
  signAction,
  walletConnectPairAction,
} from '../../actions/wallet/walletActions'
import * as api from './api'
import store from '../../configureStore'

export type AsyncAction<T, F> = {
  payload: T
  type: string
  next: (err?: string | null, data?: F) => void
}
type Address = string

const authClientsMap: Record<Address, Awaited<api.ConnectClient>> = {}

export function* getBalances(
  action: AsyncAction<
    string,
    { eth: string; usd: string; transactions: TransactionType[] }
  >
) {
  try {
    const address = action.payload
    const web3Balance: string = yield call(api.getBalance, address)
    const ethPrice: number = yield call(api.getEthPrice)
    const ethBalance = new Decimal(web3Balance).dividedBy(10 ** 18)
    const usdBalance = ethBalance.mul(ethPrice)
    const transactions: api.MoralisTransaction[] = yield call(
      api.getTransactionsList,
      address
    )
    if (!authClientsMap[address]) {
      authClientsMap[address] = yield call(api.initAuthClient, address)
      authClientsMap[address].on('auth_request', ({ id, params }) => {
        store.dispatch(messageAction({ id, params }))
      })
    }

    yield put(
      getBalancesAction.success({
        ethBalance,
        ethPrice: ethPrice,
        eth: ethBalance.toFixed(6),
        usd: usdBalance.toFixed(2),
        transactions: transactions.map((transaction) => {
          const ethTransacted = new Decimal(transaction.value).dividedBy(
            10 ** 18
          )
          return {
            account: address.toLowerCase(),
            fromAddress: transaction.from_address.toLowerCase(),
            toAddress: transaction.to_address.toLowerCase(),
            status: transaction.receipt_status === '1',
            value: ethTransacted.toFixed(6),
            hash: transaction.hash,
            usd: ethTransacted.mul(ethPrice).toFixed(2),
          } as TransactionType
        }),
      })
    )
  } catch (err) {
    yield put(getBalancesAction.failed())
  }
}

export function* estimateGas(
  action: AsyncAction<
    { from: string; to: string; amount: string; ethPrice: number },
    void
  >
) {
  try {
    const { to, from, amount, ethPrice } = action.payload
    const gasPriceWei: string = yield call(api.getGasPrice)
    const gasPriceUsd = new Decimal(gasPriceWei)
      .dividedBy(10 ** 18)
      .mul(ethPrice)
    const gasAmount: number = yield call(api.estimateGas, { to, from, amount })
    yield put(
      estimateGasAction.success({
        gasPriceWei,
        gasPriceUsd,
        gasAmount,
        fee: gasPriceUsd.mul(gasAmount).toFixed(2),
      })
    )
  } catch (err) {
    yield put(estimateGasAction.failed())
  }
}

export function* pairWalletConnect(
  action: AsyncAction<
    { uri: string; address: string },
    { eth: string; usd: string; transactions: TransactionType[] }
  >
) {
  try {
    yield put(walletConnectPairAction.success(false))

    const { uri, address } = action.payload

    yield call(api.pair, authClientsMap[address], uri)

    yield put(walletConnectPairAction.success(true))
  } catch (err) {
    console.error(err)
    yield put(walletConnectPairAction.failed())
  }
}

export function* signWalletConnect(
  action: AsyncAction<
    { id: number; signature: string; address: string },
    { eth: string; usd: string; transactions: TransactionType[] }
  >
) {
  try {
    yield put(walletConnectPairAction.success(false))

    const { id, signature, address } = action.payload

    yield call(api.respond, authClientsMap[address], id, signature)
    yield put(clearMessageAction())
  } catch (err) {
    yield put(signAction.failed())
  }
}

export default function* () {
  yield takeEvery(getBalancesAction.request.type, getBalances)
  yield takeEvery(estimateGasAction.request.type, estimateGas)
  yield takeEvery(signAction.request.type, signWalletConnect)
  yield takeEvery(walletConnectPairAction.request.type, pairWalletConnect)
}
