import Decimal from 'decimal.js'
import { call, put, takeEvery } from 'redux-saga/effects'
import { TransactionType } from '../../../components/TransictionItem'

import {
  estimateGasAction,
  getBalancesAction,
} from '../../actions/wallet/walletActions'
import * as api from './api'

export type AsyncAction<T, F> = {
  payload: T
  type: string
  next: (err?: string | null, data?: F) => void
}

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

export default function* () {
  yield takeEvery(getBalancesAction.request.type, getBalances)
  yield takeEvery(estimateGasAction.request.type, estimateGas)
}
