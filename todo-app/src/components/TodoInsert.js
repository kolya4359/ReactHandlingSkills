import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  /**
   * 사실 input은 value 값과 onChange를 설정하지 않더라도 입력할 수 있다.
   * 그저 리액트 컴포넌트 쪽에서 해당 인풋에 무엇이 입력되어 있는지 추적하지 않을 뿐이다.
   * 이런 경우 현재 state가 잘 업데이트되고 있는지 확인하려면, onChange 함수 안에서 console.log를 찍거나 리액트 개발 도구를 사용하면 된다.
   */
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시킨다.
      // 이를 방지하기 위해 e.preventDefault()를 호출한다.
      e.preventDefault();
    },
    [onInsert, value],
  );
  /**
   * onSubmit 함수가 호출되면 props로 받아 온 onInsert 함수에 현재 value 값을 파라미터로 넣어서 호출하고,
   * 현재 value 값을 초기화한다.
   */

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;

/**
 * form과 onSubmit 이벤트 대신 onClick 이벤트를 이용해도 작동하지만 onSubmit 이벤트의 경우 인풋에서 Enter 를 눌렀을 때도 발생한다.
 * 반면 버튼에서 onClick만 사용했다면, 인풋에서 onKeyPress 이벤트를 통해 Enter를 감지하는 로직을 따로 작성해야 한다.
 */
