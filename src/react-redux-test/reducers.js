import { combineReducers } from 'redux'
import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO } from './actions';
const { SHOW_ALL } = VisibilityFilters;

// store type
/*   {
    visibilityFilter: 'SHOW_ALL',
    todos: [
      {
        id: xxx,
        text: 'Consider using Redux',
        completed: true,
      },
      {
        id: xxx,
        text: 'Keep all state in a single tree',
        completed: false
      }
    ]
  } */

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        ...[{ id: action.id, text: action.text, completed: false }]
      ]
    case TOGGLE_TODO:
      return state.map((todo, i) => {
        if (i === action.index) {
          return { ...todo, ...{ completed: !todo.completed } }
        }
        return todo
      })
    default:
      return state
  }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

// const todoApp = (state = {}, action) => {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action),
//   }
// }

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
