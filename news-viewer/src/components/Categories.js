import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// 기존의 onSelect 함수를 호출하여 카테고리를 선택하고, 선택된 카테고리에
// 다른 스타일을 주는 기능을 NavLink로 대체했다.

const categories = [
  {
    name: 'all',
    text: '전체보기',
  },
  {
    name: 'business',
    text: '비즈니스',
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트',
  },
  {
    name: 'health',
    text: '건강',
  },
  {
    name: 'science',
    text: '과학',
  },
  {
    name: 'sports',
    text: '스포츠',
  },
  {
    name: 'technology',
    text: '기술',
  },
];
// name은 실제 카테고리 값을 가리키고, text 값은 렌더링할 때 사용한 한글 카테고리를 가리킨다.

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;
const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          activeclassname={({ isActive }) => (isActive ? 'active' : undefined)}
          to={c.name === 'all' ? '/' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;

/**
 * NavLink로 만들어진 Category 컴포넌트에 to 값은 "/카테고리이름"으로 설정해 주었다.
 * 그리고 카테고리 중에서 전체보기의 경우는 예외적으로 "/all" 대신에 "/"로 설정했다.
 */
