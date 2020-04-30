import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { RegistrationForm } from './components/RegistrationForm';

import { Search } from 'semantic-ui-react';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isUserRegistered: 2,
            searchedValue : ""
        }
        this.searchChange = this.searchChange.bind(this);
    }

    componentDidMount() {
        this.populateUsernaameData();
    }
    searchChange(event, { value }) {
            this.setState({ searchedValue: value  })
    }
    render() {
        if (this.state.isUserRegistered === 2) {
            return (
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
            );
        }
        else if (this.state.isUserRegistered === 0) {
            return (
                <div>
                    <Layout username={this.state.username} isUserRegistered={this.state.isUserRegistered} />
                    <RegistrationForm />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Layout username={this.state.username} isUserRegistered={this.state.isUserRegistered} />
                    <Search
                        onSearchChange={this.searchChange}
                        value={this.state.searchedValue}
                    />

                    <Home username={this.state.username} isUserRegistered={this.state.isUserRegistered} searchedQuery={this.state.searchedValue} />
                </div>
            );
        }
      
    }
    async populateUsernaameData() {
        const response = await fetch('api/username');
        const data = await response.json();
        const responseForRegisterUser = await fetch('api/isRegisteredUserOrNot');
        const isUserRegistered = await responseForRegisterUser.json();
        this.setState({ username: data[0], isUserRegistered: isUserRegistered});

    }
}
