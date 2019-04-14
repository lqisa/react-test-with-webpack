import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class HelloWorld extends Component {
  handleClick = () => {
    import('./dynamic-import').then(res => {
      res.default()
    })
  }
  render () {
    return (
      <div>
        <p>hello world</p>
        <button onClick={this.handleClick}>click me to test dynamic-import (result output in console)</button>
        <p>
          Note:
          Check the network panel in dev tools to know if the <strong>webpack code-splitting</strong> is online
        </p>
      </div>
    )
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'))
