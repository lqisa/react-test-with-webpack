import React, { Component } from 'react'

/**
 * Currently error boundaries aren't supported in SSR, `getDerivedStateFromError` and `componentDidCatch`
 * don't affect server side.
 * 
 */

export default class ErrorBounding extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  logErrorToMyService = (err, info) => {
    console.warn('logging error to my service...')
    //...
    console.warn('error uploaded.')
  }

  static getDerivedStateFromError (error) {
    console.log('getDerivedStateFromError')
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    console.log('componentDidCatch')
    // you can now log the error to an error reporting service
    this.logErrorToMyService(error, info)

    // Catch errors in any components below and re-render with error message
    this.setState({ error, errorInfo: info })
  }

  render () {
    if (this.state.errorInfo) {
      // you can render any custom fallback UI
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children
  }
}
