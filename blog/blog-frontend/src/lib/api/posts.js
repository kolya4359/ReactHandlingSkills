// 포스트에 관련된 API를 요청하는 함수

import qs from 'qs';
import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};
// qs를 사용하면 쿼리 값을 더 편리하게 생성하고 JSON으로 변환 할 수 있다.
// listPosts API를 호출할 때 파라미터로 값을 넣어 주면 /api/posts?username=tester&page=2와 같이 주소를 만들어서 호출한다.

export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });
