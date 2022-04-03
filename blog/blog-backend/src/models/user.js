// 모델 메서드는 모델에서 사용할 수 있는 함수를 의미하며, 두 가지 종류가 있다.
// 첫 번째는 인스턴스 메서드로, 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수를 의미한다.
// const user= new User({ username: 'velopert' });
// user.setPassword('mypass123');
// 두 번째는 스태틱(static) 메서드로, 모델에서 바로 사용할 수 있는 함수를 의미한다.
// const user = User.findByUsername('velopert');

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
// JWT 토큰을 만들기 위해 사용하는 라이브러리
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// 인스턴스 메서드 만들기
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
}; // 비밀번호를 파라미터로 받아서 계정의 hashedPassword 값을 설정해 준다

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true / false
}; // 파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증해 준다.

// 인스턴스 메서드를 작성할 때는 화살표 함수를 사용하면 안된다.
// 함수 내부에서 this에 접근해야 하는데(this는 문서 인스턴스를 가리킨다.)
// 화살표 함수를 사용하면 this는 문서 인스턴스를 가리키지 못한다.

// 스태틱 메서드 만들기
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
}; // username으로 데이터를 찾을 수 있게 해 준다.
// 스태틱 함수에서 this는 모델을 가리킨다. 여기선 User를 가리킨다.

// 응답할 데이터에서 hashedPassword 필드 제거
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// 토큰 발급하기
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다.
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣는다.
    {
      expiresIn: '7d', // 7일 동안 유효하다
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
