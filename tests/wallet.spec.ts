import sinon from 'sinon'
import * as api from '../src/state/sagas/wallet/api'
import { runSaga } from 'redux-saga'
import { estimateGas, getBalances } from '../src/state/sagas/wallet/index'
import { TransactionType } from '../src/components/TransictionItem'
import { WalletState } from '../src/state/reducers/wallet/types'

describe('Wallet', () => {
  sinon
    .stub(api, 'getBalance')
    .callsFake(() => Promise.resolve('1111111111111111'))
  sinon.stub(api, 'getGasPrice').callsFake(() => Promise.resolve('1234'))
  sinon.stub(api, 'estimateGas').callsFake(() => Promise.resolve(11111111))
  sinon.stub(api, 'getEthPrice').callsFake(() => Promise.resolve(11111111))
  sinon.stub(api, 'getTransactionsList').callsFake(() =>
    Promise.resolve([
      {
        value: '1',
        to_address: '0x0dCC496663a255D4DC464d07919C90cA7eD07dDC',
        from_address: '0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549',
        receipt_status: '1',
        hash: '123123123',
      },
    ])
  )

  it('getBalances generator', async () => {
    const dispatched: unknown[] = []

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: 'test' }),
      },
      getBalances,
      {
        payload: '0x0dCC496663a255D4DC464d07919C90cA7eD07dDC',
        next: () => {},
        type: '',
      }
    ).toPromise()

    expect(dispatched.length).toBe(1)

    const dispatchedAction = dispatched[0] as Record<string, string | object>

    expect(dispatchedAction.type).toBe('GET_BALANCES_SUCCESS')
    expect(typeof dispatchedAction.payload).toBe('object')

    const payload = dispatchedAction.payload as {
      eth: string
      usd: string
      transactions: object[]
    }

    expect(payload.eth).toBe('0.001111')
    expect(payload.usd).toBe('12345.68')

    expect(payload.transactions.length).toBe(1)

    const transaction = payload.transactions[0] as TransactionType

    expect(transaction.usd).toBe('0.00')
    expect(transaction.status).toBeTruthy()
    expect(transaction.toAddress).not.toBe(transaction.fromAddress)
  })

  it('estimateGas generator', async () => {
    const dispatched: unknown[] = []

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: 'test' }),
      },
      estimateGas,
      {
        payload: {
          from: '0x0dCC496663a255D4DC464d07919C90cA7eD07dDC',
          to: '0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549',
          amount: '12',
          ethPrice: await api.getEthPrice(),
        },
        next: () => {},
        type: '',
      }
    ).toPromise()

    expect(dispatched.length).toBe(1)

    const dispatchedAction = dispatched[0] as Record<string, string | object>

    expect(dispatchedAction.type).toBe('ESTIMATE_GAS_SUCCESS')
    expect(typeof dispatchedAction.payload).toBe('object')

    const payload = dispatchedAction.payload as WalletState['fee']
    expect(payload.fee).toBe('0.15')
    expect(payload.gasAmount).toBe(11111111)
    expect(payload.gasPriceWei).toBe('1234')
  })
})
