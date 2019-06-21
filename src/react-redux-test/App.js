import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import AddTodo from './addTodo'
import TodoList from './todoList'
import Filter from './Filter'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <AddTodo />
    <TodoList />
    <Filter />
  </Provider>,
  document.getElementById('root')
);
