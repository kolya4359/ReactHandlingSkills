import React, { Component } from "react";

class useRef_ex extends Component {
  id = 1;
  setId = (n) => {
    this.id = n;
  };
  printId = () => {
    console.log(this.id);
  };
  render() {
    return <div>MyComponent</div>;
  }
}

export default useRef_ex;

/**
 * 함수형 컴포넌트
 *
 * import React, { useRef } from 'react';
 *
 * const RefSample = () => {
 *  const id = useRef(1);
 *  const setId = n => {
 *      id.current = n;
 *  }
 *  const printId = () => {
 *      console.log(id.current);
 *  }
 *  return (
 *   <div>
 *       refsample
 *   </div>
 *  );
 * };
 *
 * export default RefSample;
 *
 * 이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의해야 한다.
 * 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성해야 한다.
 */
