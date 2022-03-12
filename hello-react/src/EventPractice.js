import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    username: '',
    message: '',
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  /*
    함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어진다.
    이 때문에 임의 메서드가 이벤트로 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩(binding)하는 작업이 필요하다.
    만약 바인딩하지 않는 경우라면 this가 undefined를 가리키게 된다.
    */

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  } // 객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용된다.
  // e.target.*** 은 input에 이벤트가 발생한 요소를 반환해준다.
  /**
   * 예시)
   * const name = 'variantKey';
   * const object = {
   * [name]: 'value'
   * };
   * --- >
   * { 'variantKey' : 'value'}
   */

  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message);
    this.setState({
      username: '',
      message: '',
    }); // 버튼을 클릭 한 후 message를 공백으로 만듬.
  };
  /*
    메서드 바인딩은 생성자 메서드에서 하는 것이 정석이다. 하지만 다른 방법으로는 화살표 함수 형태로 메서드를 정의하는 것이다.
    화살표 함수의 this는 상위 인스턴스를 가리키기 때문에 바인딩 하지 않아도 해당 컴포넌트를 가리킨다.
    */

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자명"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
