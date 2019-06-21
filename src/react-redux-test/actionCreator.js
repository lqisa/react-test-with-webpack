import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './actions';

let todoId = 0;

export const addTodo = (text) => {
  return { id: todoId++, type: ADD_TODO, text }
}

export const toggleTodo = (index) => {
  return { type: TOGGLE_TODO, index }
}

export const setVisibilityFilter = (filter) => {
  return { type: SET_VISIBILITY_FILTER, filter }
}
