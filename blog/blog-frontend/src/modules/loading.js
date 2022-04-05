// redux-saga를 통해 더 쉽게 API를 요청할 수 있도록 loading 리덕스 모듈과 createRequestSaga 유틸 함수를 설정한다.

import { createAction, handleActions } from 'redux-actions';

// 액션 생성
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
    요청을 위한 액션 타입을 payload로 설정한다. (예: "sample/GET_POST")
*/

// 액션 생성 함수
export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType,
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType,
);

// 초기값
const initialState = {};

// 리듀서 함수 - 루트 리듀서에 등록해야 한다.
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
