import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as queryString from 'querystring';

class App extends Component<{}, { joke: string }> {

    state = {
        joke: '...'
    };

    componentDidMount(): void {
        fetch("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}})
            .then((res) => res.json())
            .then((res) => {
                this.setState({joke: res.joke})
            });
    }

    render() {

        const parsedHash = queryString.parse(location.search.slice(1));

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Hello, {parsedHash.contactFullName}
                    </p>
                    <p> Here is your personal joke:</p>
                    <p>
                        {this.state.joke}
                    </p>
                </header>
            </div>
        );
    }
}

export default App;
