# immer 라이브러리

immer를 사용하면 불변성을 유지하는 작업을 매우 간단하게 처리할 수 있다.

```js
import produce from "immer";
const nextState = produce(originalState, (draft) => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

produce라는 함수는 두 가지 파라미터를 받는다. 첫 번째 파라미터는 수정하고 싶은 상태이고, 두 번째 파라미터는  
상태를 어떻게 업데이트할지 정의하는 함수이다.  
두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 준다.  
이 라이브러리의 핵심은 '불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해 주는 것'이다.  
단순히 깊은 곳에 위치하는 값을 바꾸는 것 외에 배열을 처리할 때도 매우 쉽고 편하다.

immer를 사용하여 컴포넌트 상태를 작성할 때는 객체 안에 있는 값을 직접 수정하거나, 배열에 직접적인 변화를 일으키는 push, splice 등의 함수를 사용해도 무방하다.  
그렇기 때문에 불변성 유지에 익숙하지 않아도 자바스크립트에 익숙하다면 컴포넌트 상태에 원하는 변화를 쉽게 반영시킬 수 있다.

## useState의 함수형 업데이트와 immer 함께 쓰기

```js
// useState의 함수형 업데이트
const [number, setNumber] = useState(0);
// prevNumbers는 현재 number 값을 가리킨다.
const onIncrease = useCallback(
  () => setNumber((prevNumber) => prevNumber + 1),
  []
);
```

immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환한다.

```js
const update = produce((draft) => {
  draft.value = 2;
});
const originalState = {
  value: 1,
  foo: "bar",
};
const nextState = update(originalState);
console.log(nextState); // { value: 2, foo: 'bar' }
```
