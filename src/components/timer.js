import { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        username: result.username
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
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