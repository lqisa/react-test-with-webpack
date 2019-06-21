import React from 'react';

const Link = ({ todo, clickHandler }) => {
  return (
    <li
      onClick={clickHandler}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
    >
      { todo.text }
    </li>
  )
}

export default Link
