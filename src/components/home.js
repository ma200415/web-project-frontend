import { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidMount() {
    test();

    async function test() {

    }
  }

  render() {
    return (
      <div>
        {/* {this.state.username} */}
        Hello
      </div>
    );
  }
}

export default Home