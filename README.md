# 리액트를 다루는 기술 / 길벗 출판사 / 김민준

## 기술

- API 개발을 보다 빠르고 쉽게 구현 할 수 있도록 도와주며, 개발된 API를 테스트하여 문서화 또는 공유 할 수 있도록 도와 주는 플랫폼인 **PostMan**을 사용하여 데이터 전송을 테스트.

### BackEnd

- **MongoDB**를 DataBase로 사용하여 데이터 저장.
- **esm 라이브러리**를 사용하여 Node.js에서 import / export 문법 사용.
- **Koa** 웹 Web framework를 사용.
- **REST API** 제작.
- 사용자 토큰을 쿠키에 담아 사용하는 **토큰 기반 인증 시스템** 사용.

### FrontEnd

- **Function Component** 형식으로 작성하여 **Hook**을 사용하여 데이터 조작.
- **Router** 를 이용하여 싱글페이지 어플리케이션(SPA)으로 만듬.
- **Redux**를 사용하여 데이터를 관리.
- **Axios**를 사용하여 API 연동.
- **Proxy**를 사용하여 BackEnd 서버와 FrontEnd 서버를 연동.
- **Styled-Components**를 사용하여 디자인.

## 진행 순서
- backend 
  - MongoDB 연결
  - 서버 구축
- 라우트 컴포넌트 제작
  - 필요한 페이지 수만큼 페이지 컴포넌트 제작
- 리덕스 생성하여 루트 리듀서 틀 제작
- 회원 인증 기능 구현
  - 로그인 / 회원가입 UI 제작
  - 리덕스로 폼 관리
  - API 연동
  - 사용자 정보 담은 리덕스 생성
  - 상세 기능 / 에러 설정
- 헤더 컴포넌트 생성 / 로그인 유지
  - 헤더 UI 제작
  - 사용자 정보 담은 리덕스에 연결하여 사용자 유무에 따른 버튼 변경
  - localStorage에 사용자 정보 저장 (처음 렌더링 될 때 값을 불러와 redux store에 넣도록 구현)
- 로그아웃 구현
  - 로그아웃 API 호출
  - localstorage 안의 값 삭제
- 글쓰기 기능
  - UI 제작
  - 리덕스 모듈을 추가하여 글쓰기 상태 관리
  - 글쓰기 API 연동
- 글 상세페이지 / 목록페이지 / 페이지네이션 구현
  - 상세페이지 UI 제작 후 API 연동 (URL 파라미터로 받아 온 ID값을 조회해서 글 정보 출력)
  - 목록페이지 UI 제작 후 API 연동
  - DB에 저장되어 있는 lastPage 값을 HTTP 헤더를 통해 클라이언트에 전달해서 페이지네이션 구현
- 포스트 수정 / 삭제 구현
  - 수정 / 삭제 버튼 제작
  - 수정 버튼을 누르면 글쓰기 페이지로 이동하고 ID를 조회해 저장되어 있는 정보가 출력
  - 삭제 버튼을 누르면 확인하는 모달창이 나오고, 확인을 누르면 글이 사라지고 홈화면으로 이동
<hr />

# Project_TagBoard

## MainPage

![1](https://user-images.githubusercontent.com/79749251/149746635-52812e65-2da5-418d-8480-b4e264ed0ed0.png)

- **useSelector**를 이용해 헤더에 user 정보를 전달하고, user 정보가 있으면 username을 나타내고, 로그인 버튼이 로그아웃으로 변합니다.
- 회원가입 / 로그인을 하면 사용자 정보가 **localStorage**에 저장되고, 새로고침을 해도 브라우저가 처음 렌더링 될 때 localStorage에 사용자 정보가 들어 있다면  
그 사용자 값을 리덕스 스토어에 넣습니다. 그러고 나서 정말 사용자가 로그인 상태인지 CHECK 액션을 디스패치하여 검증합니다.
- 글 내용에 HTML 태그가 그대로 보이는 문제는 posts.crtl API에서 **sanitize-html 라이브러리**를 이용해 해결하였고, 설정할 때 내용이 200자까지만 나오도록 하였습니다.

<hr />

## Login / SignUp

![4](https://user-images.githubusercontent.com/79749251/149760815-f7a09d43-b52d-45bf-ad14-e6f6b625e83c.png)

- input 값이 변경되면 onChange 함수로 스토어에 값이 입력됩니다.
- 로그인과 회원가입에 필요한 API를 만들고, saga를 생성해 API 요청 상태를 관리합니다.
- 사용자의 상태를 담을 user 리덕스 모듈을 만들고, check를 통해 사용자가 로그인 상태인지 확인합니다. 

<hr />

## PostDetailPage

![2](https://user-images.githubusercontent.com/79749251/149759416-4aab5f9a-f82a-41d9-980f-3d47b8cbcd79.png)

- 글을 작성하면 현재 사용자 ID와 현재 날짜를 함께 DB에 저장합니다.
- 글 상세페이지에 들어가면 현재 사용자 ID와 저장된 사용자 ID를 비교해 같으면 수정 / 삭제 버튼이 나타나고, 다르면 보이지 않도록 구현합니다.

<hr />

## PostWritePage / PostEditPage

![3](https://user-images.githubusercontent.com/79749251/149760146-c336faa4-a2b7-4e05-9b13-030474e0e0c4.png)

- 제목은 Input 으로, 내용은 **Quill라이브러리**를 이용해 구현하였습니다.
- 수정 버튼을 눌러 수정페이지로 넘어오면 DB에 저장된 제목, 내용, 태그를 호출하여 출력합니다.

<hr />

## PageNation / PostFiltering

![5](https://user-images.githubusercontent.com/79749251/149762070-2623e46b-07b4-44a1-90d4-29775a792ebe.png)

- list API를 만들 때 마지막 페이저 번호를 HTTP 헤더를 통해 클라이언트에 전달하도록 설정했습니다.
- createRequestSaga 에 SUCCESS 액션을 발생시킬 때, meta 값을 response로 넣어 주면 HTTP 헤더 및 상태 코드를 쉽게 조회할 수 있습니다.
- posts 리덕스 모듈에서 마지막 페이지 번호를 조회해서 lastPage라는 값으로 담아둡니다.
- pagination 컴포넌트를 만듭니다. 이 컴포넌트에서는 props로 현재 선택된 계정명, 태그, 현재 페이지 숫자, 마지막 페이지 숫자를 가져옵니다.  
사용자가 이 컴포넌트에 있는 버튼을 클릭하면, props로 받아 온 값을 사용하여 이동해야 할 다음 경로를 설정해 줍니다.
- PaginationContainer를 만들어 글이 없으면 아무것도 보여 주지 않고, page가 없으면 1을 기본값으로 하고, 글을 10개씩 나누어 페이지네이션 기능을 구현합니다.

<hr />

## Delete

![6](https://user-images.githubusercontent.com/79749251/149763471-8d70f529-18e8-4426-b8a5-6b5918448fff.png)

- 삭제 버튼을 누르면 모달창이 나타나고, 확인을 누르면 DB에서 저장된 정보를 삭제합니다. 

<hr />
