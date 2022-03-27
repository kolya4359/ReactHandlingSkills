import Post from '../../models/post';

/*
    POST /api/posts
    {
        title: '제목',
        body: '내용',
        tags: ['태그1', '태그2']
    }
*/
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  }); // 포스트의 인스턴스를 만들 때는 new 키워드를 사용한다.
  // 그리고 생성자 함수의 파라미터에 정보를 지닌 객체를 넣는다.
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/**
 * 인스턴스를 만들면 바로 데이터베이스에 저장되지 않는다. save() 함수를 실행시켜야
 * 비로소 데이터베이스에 저장된다. 이 함수의 반환값은 Promise이므로 async/await 문법으로
 * 데이터베이스 저장 요청을 완료할 때까지 await를 사용하여 대기할 수 있다.
 * await를 사용하려면 함수를 선언하는 부분 앞에 async 키워드를 넣어야 한다.
 * 또한, await를 사용할 때는 try/catch 문으로 오류를 처리해야 한다.
 */
export const list = (ctx) => {};

export const read = (ctx) => {};

export const remove = (ctx) => {};

export const update = (ctx) => {};
