import { Link } from "react-router-dom";

const Users = ({ users }) => {
  if (!users) return null; // users가 유효하지 않다면 아무것도 보여 주지 않음
  // users 값이 null 인지 배열인지 확인하는 유효성 검사
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
