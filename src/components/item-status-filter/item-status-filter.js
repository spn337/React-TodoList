import React from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {

    buttons = [
        { label: "All" },
        { label: "Active" },
        { label: "Done" }
    ];

    render() {
        const { activeFilter, onFilterChange } = this.props;

        const buttons = this.buttons.map(({ label }) => {
            const clazz = (activeFilter === label) ? "btn-info" : "btn-outline-secondary";
            return (
                <button type="button"
                    key={label}
                    className={`btn ${clazz}`}
                    onClick={() => onFilterChange(label)}>
                    {label}
                </button>);
        });

        return (
            <div className="btn-group" >
                {buttons}
            </div>
        )
    };
};