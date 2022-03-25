// JSONPlaceholder에서 제공하는 API를 호출하여 데스트용 데이터를 조회한다.

import axios from "axios";

// 액션 정의
const GET_USERS_PENDING = "users/GET_USERS_PENDING";
const GET_USERS_SUCCESS = "users/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "users/GET_USERS_FAILURE";

// 액션 생성 함수 정의
const getUsersPending = () => ({ type: GET_USERS_PENDING });
const getUsersSuccess = (payload) => ({ type: GET_USERS_SUCCESS, payload });
const getUsersFailure = (payload) => ({
  type: GET_USERS_FAILURE,
  error: true,
  payload,
});

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersPending());
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch(getUsersSuccess(response));
  } catch (e) {
    dispatch(getUsersFailure(e));
    throw e;
  }
};

// 초깃값 설정
const initialState = {
  users: null,
  user: null,
  loading: {
    users: false,
    user: false,
  },
  error: {
    users: null,
    user: null,
  },
};

// 리듀서 함수 users
function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_PENDING:
      return { ...state, loading: { ...state.loading, users: true } };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, users: false },
        users: action.payload.data,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        laoding: { ...state.loading, users: false },
        error: { ...state.error, users: action.payload },
      };
    default:
      return state;
  }
}

export default users;

/**
 * 현재 작성한 모듈은 getUsers라는 thunk 함수를 만들고, 이와 관련된 액션 GET_USERS_PENDING, GET_USERS_SUCCESS, GET_USERS_FAILURE 를 사용하여 상태 관리를 해 주고 있다.
 * 모듈의 상태에는 loading과 error라는 객체가 들어 있다.
 * 이 모듈에서 관리하는 API는 한 개 이상이므로 loadingUsers, loadingUser와 같이 각 값에 하나하나 이름을 지어주는 대신에
 * loading이라는 객체에 넣어 준 것이다.
 */
