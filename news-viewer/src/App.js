import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&apiKey=3e861df3b2ac41edb81a911259da0e20',
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
};

export default App;

/**
 * onClick 함수에서는 axios.get 함수를 사용했다.
 * 이 함수는 파라미터로 전달된 주소에 GET 요청을 해준다. 그리고 이에 대한 결과는,
 * .then을 통해 비동기적으로 확인할 수 있다.
 */
