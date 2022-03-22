// useSelector로 상태 조회하기, useDispatch를 사용해 액션 디스패치하기

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer2 = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer2;

// const 결과 = useSelector(상태 선택 함수);
/**
 * 여기서 상태 선택 함수는 mapStateToProps와 형태가 똑같다.
 * 이제 CounterContainer에서 connect 함수 대신 useSelector를 사용해 counter.number 값을 조회함으로써
 * Counter에게 props를 넘겨준다.
 */
// const dispatch = useDispatch();
// dispatch({ type: 'SAMPLE_ACTION' });
/**
 * 컨테이너 컴포넌트에서 액션을 디스패치해야 할 때 이 Hook을 사용한다.
 */
