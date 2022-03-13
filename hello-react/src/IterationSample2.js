import React, { useState } from 'react';

const IterationSample2 = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      // 새 항목을 추가할 때 push 함수를 사용하지 않고 concat을 사용한 이유는 push 함수는 기존 배열 자체를 변경해 주는 반면,
      // concat은 새로운 배열을 만들어 준다는 차이점이 있어서이다.
      // 기존 상태를 그대로 두면서 새로운 값을 상태로 설정하는 것을 "불변성 유지" 라고 한다.
      id: nextId, // nextId 값을 id로 설정하고
      text: inputText,
    });
    setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
    setNames(nextNames); // names 값을 업데이트한다.
    setInputText(''); // inputText를 비운다.
  };
  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample2;

/**
 * 불변성을 유지하면서 배열의 특정 항목을 지울 때는 배열의 내장 함수 filter를 사용한다.
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const biggerThanThree = numbers.filter(number => number > 3);
 * 결과: [4, 5, 6]
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const withoutThree = numbers.filter(number => number !== 3);
 * 결과: [1, 2, 4, 5, 6]
 */
