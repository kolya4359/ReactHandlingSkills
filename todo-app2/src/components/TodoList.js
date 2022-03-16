import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};
/**
 * 현재 컴포넌트가 맨 처음 렌더링될 때 2,500개 컴포넌트 중 2,491개 컴포넌트는 스크롤하기 전에는 보이지 않음에도 불구하고 렌더링이 이루어진다.
 * 그리고 나중에 todos배열에 변동이 생길 때도 todoList 컴포넌트 내부의 map 함수에서 배열의 처음부터 끝까지 컴포넌트로 변환해 주는데,
 * 이 중에서 2,491개는 보이지 않으므로 시스템 자원 낭비이다.
 * react-virtualized 라이브러리를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있다.
 * 그리고 만약 스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링시킨다.
 */
/**
 * List 컴포넌트를 사용하기 위해 rowRenderer라는 함수를 새로 작성했다. 이 함수는 react-virtualized의 List 컴포넌트에서
 * 각 TodoItem을 렌더링할 때 사용하며, 이 함수를 List 컴포넌트의 props로 설정해 주어야 한다.
 * List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 그리고 배열을 props로 넣어 주어야 한다.
 * 그러면 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화 해준다.
 */

export default React.memo(TodoList);

/**
 * React.memo는 현재 프로젝트 성능에 전혀 영향을 주지 않는다. 왜냐하면,
 * TodoList 컴포넌트의 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 유일한 이유가 todos 배열이 업데이트될 때이기 때문이다.
 * 하지만 App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는 TodoList 컴포넌트가 불필요한 리렌더링을 할 수도 있다.
 * 그렇기 때문에 지금 React.memo를 사용해서 미리 최적화해 준 것이다.
 *
 * 리스트 관련 컴포넌트를 작성할 때는 리스트 아이템과 리스트, 이 두 가지 컴포넌트를 최적화해 주는 것을 잊으면 안된다.
 */
