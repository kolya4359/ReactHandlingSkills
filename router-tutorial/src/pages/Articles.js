import { NavLink, Outlet } from "react-router-dom";

const Articles = () => {
  return (
    <div>
      <Outlet />
      <ul>
        <ArticleItem id={1} />
        <ArticleItem id={2} />
        <ArticleItem id={3} />
      </ul>
    </div>
  );
};

const ArticleItem = ({ id }) => {
  const activeStyle = {
    color: "green",
    fontSize: 21,
  };
  return (
    <li>
      <NavLink
        to={`/articles/${id}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        게시글 {id}
      </NavLink>
    </li>
  );
};

export default Articles;

/**
 * 리액트 라우터에서 제공하는 Outlet 이라는 컴포넌트는
 * Route의 children으로 들어가는 JSX 엘리먼트를 보여주는 역할을 한다
 * 지금의 경우엔 다음 내용이 Outlet 컴포넌트를 통해서 보여진다.
 * <Route path=":id" element={<Article />} />
 */
