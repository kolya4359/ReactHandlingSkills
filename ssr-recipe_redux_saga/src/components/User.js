const User = ({ user }) => {
  const { email, name, username } = user;
  return (
    <div>
      <h1>
        {username} ({name})
      </h1>
      <p>
        <b>e-mail:</b> {email}
      </p>
    </div>
  );
};

export default User;

// 컨테이너 컴포넌트에서 유효성 검사를 할 것이기 때문에 여기서 유효성 검사는 생략한다.
