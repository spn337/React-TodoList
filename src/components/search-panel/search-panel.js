import React from 'react';
import './search-panel.css';

export default class SearchPanel extends React.Component {

    state = {
        searchText: ''
    };

    onLabelChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchText: e.target.value
        });

        this.props.onSearchChange(value)
    };

    render() {
        return (
            <input type="text"
                className="form-control search-input"
                placeholder="search"
                onChange={this.onLabelChange}
                value={this.state.searchText} />
        )
    };
};
