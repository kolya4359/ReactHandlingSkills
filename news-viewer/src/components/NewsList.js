import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=3e861df3b2ac41edb81a911259da0e20`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  // 대기 중일 때
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  // 아직 articles 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};
/**
 * map 함수를 사용하기 전에 꼭 !articles를 조회하여 해당 값이 현재 null이 아닌지
 * 검사해야 한다. 이 작업을 하지 않으면, 아직 데이터가 없을 때 null에는 map 함수가 없기 때문에
 * 렌더링 과정에서 오류가 발생한다. 그래서 애플리케이셔닝 제대로 나타나지 않고
 * 흰 페이지만 보이게 된다.
 */

export default NewsList;

/**
 * useEffect에 등록하는 함수에 async를 붙이면 안된다.
 * useEffect에서 반환해야 하는 값은 뒷정리 함수이기 때문이다.
 * 따라서 useEffect 내부에서 async/await를 사용하고 싶다면, 함수 내부에 async 키워드가
 * 붙은 또다른 함수를 만들어서 사용해 주어야 한다.
 */
