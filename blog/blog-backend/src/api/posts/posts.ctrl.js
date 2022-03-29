import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';
// 객체 검증을 도와주는 라이브러리

const { ObjectId } = mongoose.Types;
// ObjectId 검증
export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isVlaid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};

/*
    POST /api/posts
    {
        title: '제목',
        body: '내용',
        tags: ['태그1', '태그2']
    }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required()가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

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

/*
    GET /api/posts
*/
export const list = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환해 주어야 한다.
  // 값이 주어지지 않았다면 1을 기본으로 사용한다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 }) // sort 함수의 파라미터는 { key: 1 } 형식으로 넣는데 key는 정렬할 필드를 설정하는 부분이고, 1은 오름차순, -1은 내림수찬수을 정렬한다.
      .limit(10) // sort 함수의 파라미터는 { key: 1 } 형식으로 넣는데 key는 정렬할 필드를 설정하는 부분이고, 1은 오름차순, -1은 내림수찬수을 정렬한다.
      .skip((page - 1) * 10) // 1페이지에는 처음 10개를 불러오고, 2페이지에는 그다음 열 개를 불러온다.
      .lean() // 데이터를 처음부터 JSON 형태로 조회할 수 있다.
      .exec(); // find 함수를 호출한 후에는 exec()를 붙여 주어야 서버에 쿼리를 요청한다.
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    // Last-Page라는 커스텀 HTTP 헤더를 설정하는 방법을 통해 마지막 페이지를 알 수 있다. Math.ceil 함수는 수를 올림해주는 함수이다.
    ctx.body = posts.map((post) => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    GET /api/posts/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).lean().exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터가 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};
/**
 * 데이터를 삭제할 때 사용하는 함수
 * remove(): 특정 조건을 만족하는 데이터를 모두 지운다.
 * findByIdAndRemove(): id를 찾아서 지운다.
 * findOneAndRemove(): 특정 조건을 만족하는 데이터 하나를 찾아서 제거한다.
 */

/*
    PATCH /api/posts/:id
    {
        title: '수정',
        body: '수정 내용',
        tags: ['수정', '태그']
    }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  // write에서 사용한 schema와 비슷한데, required()가 없다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환한다.
      // false일 때는 업데이트되기 전의 데이터를 반환한다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/**
 * findByIdAndUpdate() 함수를 사용할 때는 세 가지 파라미터를 넣어 주어야 한다.
 * 첫 번째 파라미터는 id, 두 번째 파라미터는 업데이트 내용, 세 번째 파라미터는 업데이트 옵션이다.
 */
