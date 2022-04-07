import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  // Button에 props로 fullWidth 가 넘어올 경우
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  // Button에 props로 cyan이 넘어올 경우
  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  } // 버튼 비활성화된 스타일
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    // props.cyan 값을 숫자 1과 0으로 변환해 준 이유는 styled() 함수로 감싸서 만든
    // 컴포넌트의 경우에는 임의 props가 필터링되지 않기 때문이다.
    // 필터링이 되지 않으면 cyan={true}라는 값이 Link에서 사용하는 a 태그에 그대로 전달되는데,
    // a 태그는 boolean 값이 임의 props로 설정되는 것을 허용하지 않는다. 숫자/문자열만 허용하기
    // 때문에 삼항 연산자를 사용하여 boolean을 숫자로 변환해 준 것이다.
    <StyledButton {...props} />
  );
};

// Button이 받아 오는 props를 모두 StyledButton에 전달한다는 의미이다.

export default Button;

/**
 * 이 컴포넌트에서 StyledButton을 바로 내보내도 상관없지만, 굳이 Button 리액트 컴포넌트를 만들어서 그 안에
 * StyledButton을 렌더링해 준 이유는 추후 이 컴포넌트를 사용할 때 자동 import가 되게 하기 위해서이다.
 * styled-components로 만든 컴포넌트를 바로 내보내면 자동 import가 제대로 작동하지 않는다.
 */
