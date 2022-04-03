// 토큰 검증하는 미들웨어

import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); // 토큰이 없음
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ctx의 state 안에 verify된 결과를 넣어줘야 사용 가능
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };

    // 토큰의 남은 유효 기간이 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    // exp는 토큰 정보에서 언제 만료되는지 알려주는 값.
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
