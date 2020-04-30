import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {

    constructor(props) {
        super(props); this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
        };
    }
    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState({ query, loading: true, message: '' });
    };
    render() {
        return (
            <div className="container">
                <input
                    //style={{ width: "350px", height: "50px" }}
                    className="search-bar"
                    name="searchquery"
                    type="text"

                    value={searchquery}
                    id="search-input"
                    placeholder="Search.."
                    onChange={this.handleOnInputChange}
                >
                </input>
            </div>
        );
    }

}
