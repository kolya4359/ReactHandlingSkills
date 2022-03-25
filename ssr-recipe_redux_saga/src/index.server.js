import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import path from "path";
import fs from "fs";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
import PreloadContext from "./lib/PreloadContext";

// yarn.build 명령어로 만들어진 build 파일 안에 asset-mainfest.json 파일 경로들을 조회한다.
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
  .map((key) => `<script src="${manifest.files[key]}"></script>`) // 스크립트 태그로 변환하고
  .join(""); // 합침

function createPage(root, stateScript) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initaial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
    <link href="${manifest.files["main.css"]}" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${root}
    </div>
    ${stateScript}
    <script src="${manifest.files["runtime-main.js"]}"></script>
    ${chunks}
    <script src="${manifest.files["main.js"]}"></script>
  </body>
  </html>
  `;
}
const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수이다.
const serverRender = async (req, res, next) => {
  // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해준다.
  const context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const preloadContext = {
    done: false,
    promises: [],
  };
  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
    // 이 라우터 컴포넌트는 주로 서버 사이드 렌더링 용도로 사용되는 라우터이다.
    // props로 넣어 주는 location 값에 따라 라우팅해 준다. 지금은 req.url이라는 값을 넣어 주었다.
    // 여기서 req객체는 요청에 대한 정보를 지니고 있다.
    // context라는 props는 나중에 렌더링한 컴포넌트에 따라 HTTP 상태 코드를 설정해 준다.
  );

  ReactDOMServer.renderToStaticMarkup(jsx); // renderToStaticMarkup으로 한번 렌더링한다.
  try {
    await Promise.all(preloadContext.promises); // 모든 프로미스를 기다린다.
  } catch (e) {
    return res.statuse(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
  // JSON을 문자열로 변환하고 악성 스크립트가 실행되는 것을 방지하기 위해 <를 치환 처리
  // https://redux.js.org/recipes/server-rendering#security-considerations
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`;
  // 리덕스 초기 상태를 스크립트로 주입한다.
  res.send(createPage(root, stateScript)); // 클라이언트에게 결과물을 응답한다.
};

const serve = express.static(path.resolve("./build"), {
  index: false, // "/" 경로에서 index.html을 보여 주지 않도록 설정
});

app.use(serve); // 순서가 중요하다. serverRender 전에 위치해야 한다.
app.use(serverRender);

// 5000 포트로 서버를 가동한다.
app.listen(5000, () => {
  console.log("Running on http://localhost: 5000");
});

// const html = ReactDOMServer.renderToString(
//   // 서버에서 리액트 컴포넌트를 렌더링할 때는 ReactDOMServer의 renderToString이라는 함수를 사용한다.
//   // 이 함수에 JSX를 넣어서 호출하면 렌더링 결과를 문자열로 반환한다.
//   <div>Hello Server Side Rendering!</div>
// );

// console.log(html);

/**
 * 엔트리(entry)는 웹팩에서 프로젝트를 불러올 때 가장 먼저 불러오는 파일이다.
 * 예를 들어 현재 작성 중인 리액트 프로젝트에서 index.js를 엔트리 파일로 사용한다.
 * 이 파일부터 시작하여 내부에 필요한 다른 컴포넌트와 모듈을 불러오고 있다.
 * 서버 사이드 렌더링을 할 때는 서버를 위한 엔트리 파일을 따로 생성해야 한다.
 * 이 파일이 서버를 위한 엔트리 파일이다.
 */

/**
 * 첫 번째 렌더링을 할 때는 renderToString 대신 renderToStaticMarkup이라는 함수를 사용했다.
 * renderToStaticMarkup은 리액트를 사용하여 정적인 페이지를 만들 대 사용한다.
 * 이 함수로 만든 리액트 렌더링 결과물은 클라이언트 쪽에서 HTML DOM 인터랙션을 지원하기 힘들다.
 * 지금 단계에서 renderToString 대신 renderToStaticMarkup 함수를 사용한 이유는
 * Preloader로 넣어 주었던 함수를 호출하기 위해서이다.
 * 또 이 함수의 처리 속도가 renderToString보다 좀 더 빠르기 때문이다.
 */
