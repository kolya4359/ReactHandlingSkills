import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      // TODO: 오류 처리
      return;
    }
    dispatch(register({ username, password }));
  };
  // onSubmit 이벤트가 발생했을 때 register 함수에 현재 username과 password를 파라미터로 넣어서 액션을 디스패치해 주었다.
  // 그리고 사가에서 API 요청을 처리하고, 이에 대한 결과는 auth/authError를 통해 조회할 수 있다.

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError]);
  // 결과를 얻었을 때 특정 작업을 하기 위해 useEffect를 사용했다. useEffect에 넣어 준 함수는
  // auth 값 혹은 authError 값 중에서 무엇이 유효한지에 따라 다른 작업을 한다.

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
