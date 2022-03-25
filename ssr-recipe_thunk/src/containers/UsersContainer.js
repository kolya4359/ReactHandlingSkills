import { useEffect } from "react";
import Users from "../components/Users";
import { connect } from "react-redux";
import { getUsers } from "../modules/users";
import { Preloader } from "../lib/PreloadContext";

const UsersContainer = ({ users, getUsers }) => {
  // 컴포넌트가 마운트되고 나서 호출
  useEffect(() => {
    if (users) return; // users가 이미 유효하다면 요청하지 않음
    getUsers();
  }, [getUsers, users]);
  return (
    <>
      <Users users={users} />
      <Preloader resolve={getUsers} />
    </>
  );
};

export default connect(
  (state) => ({
    users: state.users.users,
  }),
  {
    getUsers,
  }
)(UsersContainer);

/**
 * 서버 사이드 렌더링을 할 땐 이미 있는 정보를 재요청하지 않게 처리하는 작업이 중요하다.
 * 이 작업을 하지 않으면 서버 사이드 렌더링 후 브라우저에서 페이지를 확인할 때
 * 이미 데이터를 가지고 있음에도 불구하고 불필요한 API를 호출하게 된다.
 * 그러면 트래픽도 낭비되고 사용자 경험도 저하된다.
 */
