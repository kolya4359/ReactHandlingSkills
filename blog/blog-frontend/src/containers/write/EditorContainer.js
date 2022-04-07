import { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();
  // store에서 title 값과 body 값을 불러와 Editor 컴포넌트에 전달해준다.
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  // onChangeField를 useCallback으로 감싼 이유는 Editor 컴포넌트에서 사용할
  // useEffect에서 onChangeField를 사용할 것이기 때문이다.
  // onChangeField를 useCallback으로 감싸 주어야만 Editor에서 사용할 useEffect가
  // 컴포넌트 화면에 나타났을 때 딱 한 번만 실행된다.
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  // 언마운트될 때 초기화
  // 초기화를 하지 않으면 포스트 작성 후 다시 글쓰기 페이지에 들어오면 이전에
  // 작성한 내용이 남아있다.
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;

// Quill 에디터는 일반 input이나 textarea가 아니기 때문에 onChange와 value값을
// 사용하여 상태를 관리할 수 없다.
