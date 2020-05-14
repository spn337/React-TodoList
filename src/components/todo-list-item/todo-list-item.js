import React from 'react';
import './todo-list-item.css';

export default class TodoListItem extends React.Component {

    render() {
        //дістаємо змінні з props
        const { label, onDeleted,
            onToggleImportant, onToggleDone,
            important, done } = this.props;

        // відслідковуєм props
        let classNames = 'todo-list-item'
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
            <div className={classNames}>
                <span
                    onClick={onToggleDone}
                    className="todo-list-item-label">
                    {label}
                </span>

                <span>
                    <button type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={onToggleImportant}>
                        <i className="fa fa-exclamation" />
                    </button>

                    <button type="button"
                        onClick={onDeleted}
                        className="btn btn-outline-danger btn-sm">
                        <i className="fa fa-trash-o" />
                    </button>
                </span>
            </div>
        );
    }
};