import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
// 스토어 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)), // 스토어에 사가 미들웨어 적용
);

// 사가 미들웨어 실행
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// Provider를 통해 리액트 프로젝트에 리덕스를 적용
