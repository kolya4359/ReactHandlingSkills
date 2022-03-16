import React, { useReducer, useRef, useCallback } from 'react';
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

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가
      // {type: 'INSERT', todo: { id: 1, text: 'todo', checked: false }}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // { type: 'REMOVE', id: 1 }
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // { type: 'REMOVE', id: 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  /**
   * useReducer를 사용할 때는 원래 두 번째 파라미터에 초기 상태를 넣어 주어야 한다. 지금은 그 대신 두 번째 파라미터에 undefined를 넣고,
   * 세 번째 파라미터에 초기 상태를 만들어 주는 함수인 createBulkTodos를 넣어 주었다. 이렇게 하면 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출된다.
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
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1; // nextId 1씩 더하기
  }, []);
  /**
   * useState가 아닌 useRef를 사용하여 컴포넌트에서 사용할 변수(netxId)를 만드는 이유는 id값은 렌더링되는 정보가 아니기 때문이다.
   * 예를 들어 이 값은 화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가 리렌더링될 필요도 없다. 단순히 새로운 항목을 만들 때 참조되는 값일 뿐이다.
   */
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

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
