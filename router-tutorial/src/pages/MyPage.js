import { Navigate } from "react-router-dom";

const MyPage = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  } // replace={true} 현재 페이지의 기록을 남기지 않는다.

  return <div>마이 페이지</div>;
};

export default MyPage;
