import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

/**
 * 긴 액션 타입 추가 코드를 짧게 만들어 주는 함수
 *
 * const REGISTER = 'auth/REGISTER';
 * const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
 * const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
 *
 * 위의 액션 타입을
 *
 * const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
 *  'auth/REGISTER',
 * );
 *
 * 이렇게 바꿀 수 있다.
 */

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  // 제너레이터 함수
  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
        // 액션 안에 meta 값을 response로 넣어 주면 나중에 HTTP 헤더 및 상태 코드를 쉽게 조회할 수 있다.
        // HTTP 헤더 및 상태 코드는 페이지네이션을 구현하기 위해 헤더에 마지막페이지 정보를 넣어 둔 것을 조회하기 위해서이다.
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
