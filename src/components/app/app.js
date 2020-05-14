import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import AddItemForm from '../add-item-form';

import './app.css';

export default class App extends React.Component {

    maxId = 100;

    state = {
        todoData: [
            this.createItem('Drink Coffee'),
            this.createItem('Make Awesome App'),
            this.createItem('Have a lunch'),
        ],
        searchText: ' ',
        filterName: 'All'
    };

    createItem(label) {
        return {
            label,
            done: false,
            important: false,
            id: this.maxId++
        };
    }

    addItem = (text) => {
        const newItem = this.createItem(text);
        this.setState(({ todoData }) => {

            const newArray = [
                ...todoData, newItem
            ];

            return {
                todoData: newArray
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    toggleProperty(arr, id, propName) {

        const index = arr.findIndex((el) => el.id === id);

        const oldItem = arr[index];
        const newItem = {
            ...oldItem, [propName]: !oldItem[propName]
        }

        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onSearchChange = (searchText) => {
        this.setState({ searchText });
    };

    onFilterChange = (filterName) => {
        this.setState({ filterName });
    };

    filterItems(arr, filterName) {
        //by filter
        if (filterName === 'Active') {
            return arr.filter((el) => !el.done);
        }
        else if (filterName === 'Done') {
            return arr.filter((el) => el.done);
        }
        return arr;
    }

    searchItems(arr, searchText) {
        //by search
        if (searchText === ' ') {
            return arr;
        }

        return arr.filter((el) => {
            return el.label
                .toLowerCase()
                .includes(searchText.toLowerCase())
        });
    };

    render() {

        const { todoData, searchText, filterName } = this.state;

        const visibleData = this.filterItems
            (this.searchItems(todoData, searchText), filterName);

        const doneCount = todoData
            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="app-content">
                <AppHeader todo={todoCount} done={doneCount} />
                <div className="panel">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter
                        activeFilter={filterName}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <TodoList
                    data={visibleData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddItemForm
                    onAdded={this.addItem}
                />
            </div>
        );
    }
};