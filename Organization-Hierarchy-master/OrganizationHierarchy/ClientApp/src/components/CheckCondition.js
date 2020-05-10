import React, { Component } from 'react';
import { Home } from './Home';

export class CheckCondition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedValue: props.searchedValue,
            chartType: props.chartType,
            username: props.username,
            isUserRegistered: props.isUserRegistered
        }
    }
    render() {
        return (
            <Home />
        );
    }
}
