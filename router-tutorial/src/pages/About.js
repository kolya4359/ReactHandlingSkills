import { useSearchParams } from "react-router-dom";

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detail = searchParams.get("detail");
  const mode = searchParams.get("mode");

  const onToggleDetail = () => {
    setSearchParams({ mode, detail: detail === "true" ? false : true });
  };

  const onIncreaseMode = () => {
    const nextMode = mode === null ? 1 : parseInt(mode) + 1;
    setSearchParams({ mode: nextMode, detail });
  };

  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
      <p>detail: {detail}</p>
      <p>mode: {mode}</p>
      <button onClick={onToggleDetail}>Toggle detail</button>
      <button onClick={onIncreaseMode}>mode + 1</button>
    </div>
  );
};

export default About;

/**
 * useSearchParams 는 배열 타입의 값을 반환하며, 첫번째 원소는 쿼리파라미터를 조회하거나 수정하는 메서드들이 담긴 객체를 반환합니다.
 * get 메서드를 통해 특정 쿼리파라미터를 조회할 수 있고, set 메서드를 통해 특정 쿼리파라미터를 업데이트 할 수 있습니다. 만약 조회시에 쿼리파라미터가 존재하지 않는다면 null 로 조회됩니다.
 * 두번째 원소는 쿼리파라미터를 객체형태로 업데이트할 수 있는 함수를 반환합니다.

쿼리파라미터를 사용하실 때 주의하실점은 쿼리파라미터를 조회할 때 값은 무조건 문자열 타입이라는 것 입니다.
즉, true 또는 false 값을 넣게 된다면 값을 비교할 때 꼭 'true' 와 같이 따옴표로 감싸서 비교를 하셔야 하고, 숫자를 다루게 된다면 parseInt 를 사용하여 숫자 타입으로 변환을 해야 합니다.
 */
