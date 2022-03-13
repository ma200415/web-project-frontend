import { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidMount() {
     test();

    async function test() {
   await   fetch("https://web-project-backend.vincentmichael.repl.co/users")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result[0].username);

            this.setState({
              username: result.username
            });
          },
          (error) => {
            console.log(error);
          }
        )
    }
  }

  render() {
    return (
      <div>
        {this.state.username}
      </div>
    );
  }
}

export default Timer