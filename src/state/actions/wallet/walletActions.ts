import { createAction, createActions } from '../../../utils/redux'

export const loginAction = createAction('LOGIN')

export const messageAction = createAction('MESSAGE')

export const clearMessageAction = createAction('CLEAR_MESSAGE')

export const getBalancesAction = createActions('GET_BALANCES')

export const estimateGasAction = createActions('ESTIMATE_GAS')

export const walletConnectPairAction = createActions('WALLET_CONNECT_PAIR')

export const signAction = createActions('WALLET_CONNECT_SIGN')
