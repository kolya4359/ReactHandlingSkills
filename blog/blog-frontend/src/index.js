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
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
// 스토어 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)), // 스토어에 사가 미들웨어 적용
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안 함
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

// 사가 미들웨어 실행
sagaMiddleware.run(rootSaga);
loadUser();
// sagaMiddleware.run이 호출된 이후에 loadUser 함수를 호출해야 한다.
// loadUser 함수를 먼저 호출하면 CHECK 액션을 디스패치했을 때 사가에서 제대로 처리하지 않는다.

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// Provider를 통해 리액트 프로젝트에 리덕스를 적용
