import React from 'react';
import './add-item-form.css';

export default class AddItemForm extends React.Component {

    state = {
        label: ''
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdded(this.state.label)
        this.setState({
            label: ''
        });
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    render() {
        return (
            <form className="add-item-form"
                onSubmit={this.onSubmit}>

                <input type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done"
                    value={this.state.label} />

                <button
                    className="btn btn-outline-secondary btn-sm">
                    Add Item
                </button>
            </form>
        );
    };
};
