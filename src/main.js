import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import('./dynamic-import').then(res => {
  res.default()
})

class HelloWorld extends Component {
  render () {
    return <p>hello world</p>
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'))
