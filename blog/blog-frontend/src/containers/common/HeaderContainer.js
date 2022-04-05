// Header 컴포넌트를 리덕스와 연결

import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return <Header user={user} />;
};

export default HeaderContainer;
