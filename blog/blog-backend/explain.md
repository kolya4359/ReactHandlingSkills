# Koa

## app.use

미들웨어 함수는 다음과 같은 구조로 이루어져 있다.

```js
(ctx, next) => {};
```

Koa의 미들웨어 함수는 두 개의 파라미터를 받는다.  
첫 번째 파라미터는 조금 전에도 사용한 ctx라는 값이고, 두 번째 파라미터는 next이다.

ctx는 Context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있다.  
next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수이다. 미들웨어를 등록하고 next 함수를 호출하지 않으면, 그다음 미들웨어를 처리하지 않는다.

만약 미들웨어에서 next를 사용하지 않으면 ctx => {} 와 같은 형태로 파라미터에 next를 설정하지 않아도 괜찮다. 주로 다음 미들웨어를 처리할 필요가 없는 라우트 미들웨어를 나중에 설정할 때 이러한 구조로 next를 생략하여 미들웨어를 작성한다.

미들웨어는 app.use를 사용하여 등록되는 순서대로 처리된다.

### next 함수는 Promise를 반환

next 함수를 호출하면 Promise를 반환한다. 이는 Koa가 Express와 차별화되는 부분이다.  
next 함수가 반환하는 Promise는 다음에 처리해야 할 미들웨어가 끝나야 완료된다.

```js
const Koa = require('koa');

const app = new Koa();

// 미들웨어 함수를 애플리케이션에 등록한다.
app.use((ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; // Unauthorized
    return;
  }
  next().then(() => {
    console.log('END');
  });
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});

// 결과:
// Listening to port 4000
// /?authorized=1
// 1
// 2
// END
```

## async/await 사용하기

Koa는 async/await를 정식으로 지원하기 때문에 해당 문법을 편하게 사용할 수 있다.

```js
const Koa = require('koa');

const app = new Koa();

// 미들웨어 함수를 애플리케이션에 등록한다.
app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; // Unauthorized
    return;
  }
  await next();
  console.log('END');
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
// 결과:
// Listening to port 4000
// /?authorized=1
// 1
// 2
// END
```

# koa-router

```js
const Router = require('koa-router');

// 객체 생성
const router = new Router();

// 라우터 설정
router.get('/', (ctx) => {
  ctx.body = '홈';
});

// app 인스턴스에 라우터 적용
app.use(router.toures()).use(router.allwoedMethods());
```

라우트를 설정할 때, router.get의 첫 번째 파라미터에는 라우트의 경로를 넣고, 두 번째 파라미터에는 해당 라우트에 적용할 미들웨어 함수를 넣는다. 여기서 get 키워드는 해당라우트에서 사용할 HTTP 메서드를 의미한다. get 대신에 post, put, delete 등을 넣을 수 있다.

## 라우트 파라미터와 쿼리

라우터의 파라미터를 설정할 때는 /about/:name 형식으로 콜론(:)을 사용하여 라우트 경로를 설정한다. 또 파라미터가 있을 수도 있고 없을 수도 있다면 /about/:name? 같은 형식으로 파라미터 이름 뒤에 물음표를 사용한다. 이렇게 설정한 파라미터는 함수의 ctx.params 객체에서 조회할 수 있다.  
URL 쿼리의 경우, /posts/?id=10 같은 형식으로 요청했다면 해당 값을 ctx.query에서 조회할 수 있다. 쿼리 문자열을 자동으로 객체 형태로 파싱해 주므로 별도로 파싱 함수를 돌릴 필요가 없다.(문자열 형태의 쿼리 문자열을 조회해야 할 때는 ctx.querystring을 사용한다.)

### 파리미터와 쿼리 용도

파라미터는 처리할 작업의 카테고리를 받아 오거나, 고유 ID 혹은 이름으로 특정 데이터를 조회할 때 사용한다.  
쿼리는 옵션에 관련된 정보를 받아 온다. 예를 들어 여러 항목을 리스팅하는 API라면, 어떤 조건을 만족하는 항목을 보여 줄지 어떤 기준으로 정렬할지를 정해야 할 때 쿼리를 사용한다.
