import { createStore } from "redux";

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");
/**
 * UI를 관리할 때 별도의 라이브러리를 사용하지 않기 때문에 DOM을 직접 수정해 주어야 한다.
 * 파일 상단에 수정할 DOM 노드를 가리키는 값을 미리 선언해 준다.
 */

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
/**
 * 프로젝트의 상태에 변화를 일으키는 것을 액션이라 한다.
 * 액션에 이름을 정의해 준다. (문자열 형태로, 대문자로 작성하며 고유해야 한다.)
 */

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });
/**
 * 액션 이름을 사용하여 액션 객체를 만드는 액션 생성 함수를 작성한다.
 * 액션 객체는 type 값을 반드시 갖고 있어야 하며, 그 외에 추후 상태를 업데이트할 때 참고하고 싶은
 * 값은 마음대로 넣을 수 있다.
 */

const initialState = {
  toggle: false,
  counter: 0,
};
/**
 * 초깃값을 정의한다. 초깃값의 형태는 자유이다.
 */

// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지를 해 주어야 한다.
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
/**
 * 리듀서는 변화를 일으키는 함수이다. 함수의 파라미터로는 state와 action 값을 받아온다.
 *
 * 리듀서 함수가 맨 처음 호출될 때는 state 값이 undefince이다. 해당 값이 undefined로 주어졌을 때
 * initialState를 기본값으로 설정하기 위해 함수의 파라미터 쪽에 기본값이 설정되어 있다.
 * 리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜 주어야 한다.
 * 이 작업을 할 때 spread 연산자를 사용하면 편하다. 단, 객체의 구조가 복잡해지면
 * (예를 들면 object.something.inside.value) spread 연산자로 불변성을 관리하며 업데이트 하는 것이 굉장히 번거로울 수 있고
 * 코드의 가독성도 나빠지기 때문에 리덕스의 상태는 최대한 깊지 않은 구조로 진행하는 것이 좋다.
 */

const store = createStore(reducer);
/**
 * 스트어를 만들 때는 createStore 함수를 사용한다. 이 함수를 사용하려면
 * 코드 상단에 import 구문을 넣어 리덕스에서 해당 함수를 불러오고,
 * 함수의 파라미터에는 리듀서 함수를 넣어 주어야 한다.
 */

const render = () => {
  const state = store.getState(); // 현재 상태를 불러온다.
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();
/**
 * render 함수는 상태가 업데이트될 때마다 호출되며, 리액트의 render 함수와는 다르게 이미
 * html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경해 준다.
 */

store.subscribe(render);
/**
 * 스토어의 상태가 바뀔 때마다 render함수가 호출되도록 해준다.
 * subscribe 함수의 파라미터로는 함수 형태의 값을 전달해 준다. 이렇게 전달된 함수는
 * 추후 액션이 발생하여 상태가 업데이트될 때마다 호출된다.
 */

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
/**
 * 액션을 발생시키는 것을 디스패치라고 한다. 디스패치를 할 때는 스토어의 내장 함수
 * dispatch 를 사용한다. 파라미터는 액션 객체를 넣어 주면 된다.
 */
