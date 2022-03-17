import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  const goArticles = () => {
    // articles 경로로 이동
    navigate("/articles", { replace: true });
  };
  /**
   * replace 라는 옵션은 해당 페이지를 기록에 남기지 않는다.
   * replace: true 이기 때문에 articles 페이지에서 다른 페이지로 넘어간 후
   * 뒤로 가기를 실행하면 articles 페이지는 기록이 없기 때문에
   * articles의 전 페이지로 이동한다.
   */

  return (
    <div>
      <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticles}>게시글 목록</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

// 각 페이지가 보여져야 하는 부분에 Outlet 컴포넌트를 사용해주었다.
// useNavigate 는 Link 컴포넌트를 사용하지 않고 다른 페이지로 이동을 해야 하는 상황에 사용하는 Hook 이다.
