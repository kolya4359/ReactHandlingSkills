import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);
  // useState 함수의 파라미터에는 상태의 기본값을 넣어준다.
  // 이 함수가 호출되면 배열을 반환하는데 그 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수이다.
  // 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링된다.

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;
