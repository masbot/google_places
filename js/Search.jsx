import React, { Component } from 'react';

class Search extends Component {
    handleSearchTermChange = event => {
        this.props.onSearchTermChange(event);
    };

    handlePressEnter = event => {
        this.props.onEnter(event);
    };

    render() {
        return (
            <nav className="navbar navbar-light" style={{ backgroundColor: '#455a64' }}>
                <input
                    style={{ width: '600px' }}
                    type="text"
                    value={this.props.searchTerm}
                    placeholder="Search"
                    onKeyPress={this.handlePressEnter}
                    onChange={this.handleSearchTermChange}
                />
                <div className={'pull-right'} style={{ color: 'white' }}>{this.props.city.name}</div>
            </nav>
        );
    }
}

export default Search;
