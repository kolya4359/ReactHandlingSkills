const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
/**
 * 액션 타입 정의.
 * 액션 타입은 대문자로 정의하고, 문자열 내용은 '모듈 이름/액션 이름'과 같은 형태로 작성
 */

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
/**
 * 액션 생성 함수 만들기
 * export라는 키워드를 넣어서 이 함수를 다른 파일에서 불러와 사용할 수 있도록 한다.
 */

const initialState = {
  number: 0,
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}

export default counter;

/**
 * 리듀서 함수에 현재 상태를 참조하여 새로운 객체를 생성해서 반환하는 코드를 작성했다.
 * export 와 export default 의 차이는 export 는 여러 개를 내보낼 수 있지만
 * export default는 단 한 개만 내보낼 수 있다는 것이다.
 *
 * export를 불러 올때는 import { increase, decrease } from './counter';
 * export default를 불러 올때는 import counter from './counter';
 */
