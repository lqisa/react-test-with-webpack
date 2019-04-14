import React, { Component, lazy, Suspense, createContext } from 'react'
import ReactDOM from 'react-dom'
import ErrorBounding from './component/ErrorBounding'
import './main.scss'
/**
 * React.lazy currently only supports `default` exports.
 * If the module you want to import uses named exports, 
 * you can create an `intermediate module` that `reexports` it as the default.
 */
// const LazyCmpt = lazy(() => import('./lazyTest'))
const LazyCmpt = lazy(() => import('./lazyTestExportIntermediate'))

/**
 * Context is primarily used when some data needs to be accessible by many components at different nesting levels.
 * 
 * The `defaultValue` argument is *only* used when a component does not have a *matching Provider above it in the tree*.
 */
const ThemeContext = createContext('white')

class BuggyTest extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  handleSimulateErrorClick = () => {
    this.setState({ hasError: true })
  }

  // Assign a contextType to read the current theme context.
  static contextType = ThemeContext;

  componentDidUpdate = () => {
    console.log('Buggy component updated~')
  }

  render() {
    if (this.state.hasError) {
      throw new Error('I crashed!')
    }
    return (
      <div>
        <h2>Component BuggyTest for Testing `ErrorBounding`</h2>
        <button onClick={this.handleSimulateErrorClick}>I crashed!</button>
        <div style={{ ...this.context }}>
          <p style={{ color: 'green' }}>testing context</p>
        </div>
      </div>
    )
  }
}

class HelloWorld extends Component {
  constructor(props) {
    super(props)
    this.state = { addThemeContext: true }
  }

  handleClick = () => {
    import('./dynamic-import').then(res => {
      res.default()
    })
  }

  fallback = () => {
    return <div>loading...</div>
  }

  toggleThemeContext = () => {
    this.setState(({ addThemeContext }) => {
      return { addThemeContext: !addThemeContext }
    })
  }

  render() {
    const toggleContextButton = <button onClick={this.toggleThemeContext}>Toggle Context</button>
    const children = <div>
      <p>hello world</p>
      <button onClick={this.handleClick}>click me to test dynamic-import (result output in console)</button>
      <p>
        Note:
            Check the network panel in dev tools to know if the <strong>webpack code-splitting</strong> is online
          </p>
      <Suspense fallback={this.fallback()}>
        <LazyCmpt />
      </Suspense>
      <ErrorBounding>
        <BuggyTest />
      </ErrorBounding>
    </div>
    if (this.state.addThemeContext) {
      return (
        <div>
          {toggleContextButton}
          <ThemeContext.Provider value={{ fontSize: '20px', backgroundColor: 'dodgerblue' }}>
            {children}
          </ThemeContext.Provider>
        </div>
      )
    } else {
      return (
        <div>
          {toggleContextButton}
          {children}
        </div>
      )
    }
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'))
