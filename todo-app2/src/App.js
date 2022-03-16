import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
  /**
   * useState의 기본값에 함수를 넣어 줘야 한다.
   * useState(createBulkTodos())라고 작성하면 리렌더링될 때마다 createBulkTodos 함수가 호출되지만,
   * useState(createBulkTodos)처럼 파라미터를 함수 형태로 넣어 주면 컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수가 실행된다.
   */

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1; // nextId 1씩 더하기
  }, []);
  /**
   * useState가 아닌 useRef를 사용하여 컴포넌트에서 사용할 변수(netxId)를 만드는 이유는 id값은 렌더링되는 정보가 아니기 때문이다.
   * 예를 들어 이 값은 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요도 없다. 단순히 새로운 항목을 만들 때 참조되는 값일 뿐이다.
   */
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);
  // todo.id와 입력된 id를 비교하여 같지 않으면 true를 반환한다. (true를 반환해야 새로운 배열에 포함된다.)
  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);
  /**
   * // onToggle과 onRemove 함수가 쓸데없이 리렌더링 되는 것을 방지하기.
   * 기존의 함수에서 setTodos 함수를 사용할 때는 새로운 상태를 파라미터로 넣어 주었다. setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신,
   * 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수도 있다. 이를 함수형 업데이트라고 부른다.
   *
   * ex)
   * const [number, setNumber] = useState(0);
   * // prevNumbers는 현재 number 값을 가리킨다.
   * const onIncrease = useCallback(
   * () => setNumber(prevNumber => prevNumber +1),
   * [],
   * );
   *
   * setNumber(number + 1)을 하는 것이 아니라, 위 코드처럼 어떻게 업데이트할지 정의해 주는 업데이트 함수를 넣어준다.
   * 그러면 useCallback을 사용할 때 두 번째 파라미터로 넣는 배열에 number를 넣지 않아도 된다.
   */

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;

/**
 * onToggle 함수에 map이 사용된 이유는 todo.id === id ? ... : ... 이라는 삼항 연산자가 사용되었기 때문이다.
 * todo.id와 현재 파라미터로 사용된 id 값이 같을 때는 우리가 정해 준 규칙대로 새로운 객체를 생성하지만, id 값이 다를 때는 변화를 주지 않고
 * 처음 받아 왓던 상태 그대로 반환한다. 그렇기 때문에 map을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트되고 나머지는 그대로 남아 있게 된다.
 */
