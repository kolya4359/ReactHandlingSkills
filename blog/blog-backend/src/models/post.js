// 스키마 생성
import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  // 스키마에 사용자 정보를 넣어준다. MongoDB에서는 필요한 데이터를 통째로 집어넣는다.
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

/**
 * 스키마를 만들 때는 mongoose 모듈의 Schema를 사용하여 정의한다.
 * 그리고 각 필드 이름과 필드의 데이터 타입 정보가 들어 있는 객체를 작성한다.
 * 필드의 기본값으로는 default 값을 설정해 주면 된다.
 */

// 모델 생성
const Post = mongoose.model('Post', PostSchema);
export default Post;

/**
 * model() 함수는 기본적으로 두 개의 파라미터가 필요하다. 첫 번째 파라미터는
 * 스키마 이름이고, 두 번째 파라미터는 스키마 객체이다. 데이터베이스는 스키마 이름을 정해 주면
 * 그 이름의 복수 형태로 데이터베이스에 컬렉션 이름을 만든다.
 *
 * 예를 들어 스키마 이름을 Post로 설정하면, 실제 데이터베이스에 만드는 컬렉션 이름은
 * posts이다. BookInfo로 입력하면 bookinfos를 만든다.
 * 세 번째 파라미터에 원하는 이름을 입력하면 복수형태 말고 따로 지정이 가능하다.
 *
 * mongoose.model('Post', PostSchema, 'custom_book_colledction');
 * 이 경우 첫 번째 파라미터로 넣어 준 이름은 나중에 다른 스키마에서 현재 스키마를
 * 참조해야 하는 상황에서 사용한다.
 */
