import Decimal from 'decimal.js'
import { AnyAction } from 'redux'
import { NA_STRING } from '../../../constants/static'
import {
  clearMessageAction,
  estimateGasAction,
  getBalancesAction,
  loginAction,
  messageAction,
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
  message: '',
  id: -1,
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
    case messageAction.type:
      return {
        ...state,
        message: action.payload.params.message,
        id: action.payload.id,
        client: action.payload.client,
      }
    case clearMessageAction.type:
      return { ...state, message: initialState.message }
    default: {
      return state
    }
  }
}

export default wallet
