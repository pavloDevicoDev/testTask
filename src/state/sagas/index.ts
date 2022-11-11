import { all, fork } from 'redux-saga/effects'

import walletSaga from './wallet'

export default function* rootSaga() {
  yield all([fork(walletSaga)])
}
