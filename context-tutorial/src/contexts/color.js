import { createContext, useState } from "react";

const ColorContext = createContext({
  state: { color: "black", subcolor: "red" },
  action: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

// const ColorConsumer = ColorContext.Consumer와 같은 의미
const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider와 ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };

export default ColorContext;

/**
 * ColorProvider라는 컴포넌트를 작성했다. 이 컴포넌트에서는 ColorContext.Provider를 렌더링하고 있다.
 * 이 Provider의 value에는 상태는 state로, 업데이트 함수는 actions로 묶어서 전달하고 있다.
 * Context에서 값을 동적으로 사용할 때 반드시 묶어줄 필요는 없지만, 이렇게 state와 actions 객체를
 * 따로따로 분리해 주면 나중에 다른 컴포넌트에서 Context의 값을 사용할 때 편하다.
 *
 * 추가로 createContext를 사용할 때 기본값으로 사용할 객체도 수정했다.
 * createContext의 기본값은 실제 Provider와 value에 넣는 객체의 형태와 일치시켜 주는 것이 좋다.
 * 그렇게 하면 Context 코드를 볼 때 내부 값이 어떻게 구성되어 있는지 파악하기도 쉽고, 실수로
 * Provider를 사용하지 않았을 때 리액트 애플리케이션에서 에러가 발생하지 않는다.
 */
