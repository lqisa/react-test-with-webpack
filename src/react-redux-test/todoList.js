import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from './actionCreator'
import Link from './Link'

class TodoList extends Component {
  render() {
    const { todos, visibilityFilter, dispatch } = this.props
    let curTodos = []
    switch(visibilityFilter) {
      case 'SHOW_ALL':
        curTodos = todos
        break
      case 'SHOW_COMPLETED':
        curTodos = todos.filter(todo => todo.completed)
        break
      case 'SHOW_ACTIVE':
        curTodos = todos.filter(todo => !todo.completed)
        break
    }
    return (
      <ul>
        {
          curTodos.map((todo, index) => <Link todo={todo} key={todo.id} clickHandler={() => dispatch(toggleTodo(index))} />)
        }
      </ul>
    )
  }
}

const mapStatetoProps = ({ todos, visibilityFilter }) => ({
  todos,
  visibilityFilter,
})

const mapDispatchToProps = state => {

}

export default connect(mapStatetoProps)(TodoList)
