import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";

const sagaMiddleware = createSagaMiddleware();

// 스토어 만들고 스토어에 리덕스 적용
const store = createStore(
  rootReducer,
  // 브라우저에서 상태를 재사용할 때는 다음과 같이 스토어 생성 과정에서
  // window.__PRELOADED_STATE__ 를 초깃값으로 사용하면 된다.
  window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용함
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
