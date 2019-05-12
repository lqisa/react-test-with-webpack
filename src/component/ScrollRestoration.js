import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollRestoration extends Component {
  childRef = React.createRef()
  recordScrollPosition = () => {
    sessionStorage[`scrollPosition_${this.props.name}`] = this.childRef.current.firstElementChild.scrollTop
  }
  componentDidMount () {
    this.childRef.current.firstElementChild.scrollTop = parseInt(sessionStorage[`scrollPosition_${this.props.name}`], 10) || 0
  }
  componentWillUnmount () {
    this.recordScrollPosition()
  }

  render () {
    return (
      <div id="mark" ref={this.childRef}>
        { this.props.children }
      </div>
    )
  }  
}

export default ScrollRestoration