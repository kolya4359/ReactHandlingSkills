// 로그인했을 때만 API를 사용할 수 있는 미들웨어

const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401; // Unauthorized
    return;
  }
  return next();
};

export default checkLoggedIn;

// 로그인 상태가 아니라면 401HTTP Status를 반환하고, 그렇지 않으면 그다음 미들웨어를 실행한다.
