import { createAction, createActions } from '../../../utils/redux'

export const loginAction = createAction('LOGIN')

export const getBalancesAction = createActions('GET_BALANCES')

export const estimateGasAction = createActions('ESTIMATE_GAS')
