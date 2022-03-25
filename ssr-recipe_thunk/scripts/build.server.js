/**
 * webpack.config.server.js에서 만든 환경 설정을 사용하여 웹팩으로 프로젝트를 빌드하는 스크립트
 * build.js라는 파일은 클라이언트에서 사용할 빌드 파일을 만드는 작업을 한다.
 * build.js와 비슷한 형식으로 서버에서 사용할 빌드 파일을 만드는 것이 build.server.js 스크립트이다.
 */

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

process.on("unhandledRejection", (err) => {
  throw err;
});

require("../config/env");
const fs = require("fs-extra");
const webpack = require("webpack");
const config = require("../config/webpack.config.server");
const paths = require("../config/paths");

function build() {
  console.log("Creating server build...");
  fs.emptyDirSync(paths.ssrBuild);
  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(stats.toString());
    });
  });
}

build();
