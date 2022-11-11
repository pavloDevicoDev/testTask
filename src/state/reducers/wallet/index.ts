import Decimal from 'decimal.js'
import { AnyAction } from 'redux'
import { NA_STRING } from '../../../constants/static'
import {
  estimateGasAction,
  getBalancesAction,
  loginAction,
} from '../../actions/wallet/walletActions'
import { WalletState } from './types'

const initialState: Partial<WalletState> = {
  balance: {
    eth: NA_STRING,
    usd: NA_STRING,
    ethBalance: new Decimal(0),
    ethPrice: 0,
  },
  transactions: [],
  fee: {
    fee: NA_STRING,
    gasAmount: 0,
    gasPriceUsd: new Decimal(0),
    gasPriceWei: '0',
  },
}

const wallet = (
  state = initialState,
  action: AnyAction
): Partial<WalletState> => {
  switch (action.type) {
    case loginAction.type:
      return {
        ...state,
        ...action.payload,
      }
    case getBalancesAction.type.SUCCESS:
      return {
        ...state,
        balance: {
          eth: action.payload.eth,
          usd: action.payload.usd,
          ethBalance: action.payload.ethBalance,
          ethPrice: action.payload.ethPrice,
        },
        transactions: action.payload.transactions,
      }
    case estimateGasAction.type.SUCCESS:
      return {
        ...state,
        fee: action.payload,
      }
    default: {
      return state
    }
  }
}

export default wallet
