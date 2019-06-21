import React, { Component } from 'react';
import { addTodo } from './actionCreator';
import { connect } from 'react-redux'

class AddTodo extends Component {
  render () {
    let input
    const { dispatch } = this.props;
    return (
      <form onSubmit={(e) =>{
        e.preventDefault()
        if(!input.value.trim()) {
          return
        }
        const action = addTodo(input.value)
        console.log(action)
        dispatch(action)
        input.value = ''
      }}>
        <input type="text" ref={node => input = node}></input>
        <button>AddTodo</button>
      </form>
    )
  }
}

export default connect()(AddTodo)