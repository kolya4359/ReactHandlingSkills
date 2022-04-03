// API

const Router = require('koa-router');
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

// Object 검증이 필요한 부분에 검증 미들웨어를 추가
// id로 포스트를 찾은 후 ctx.state에 담아 준다.
posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
