import UsersContainer from "../containers/UsersContainer";
import UserContainer from "../containers/UserContainer";
import { useParams } from "react-router";
import { Routes, Route } from "react-router-dom";

const UsersPage = () => {
  const { id } = useParams();
  return (
    <>
      <UsersContainer />
      <Routes>
        <Route path="/users/:id" element={<UserContainer id={id} />} />
      </Routes>
    </>
  );
};

export default UsersPage;
