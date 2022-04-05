// 루트 리듀서

import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
});

// 프로젝트의 rootSaga 생성
export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
