import React, { Component } from 'react'
import Loading from './Loading'

export default class AsyncImport extends Component {
  state = { loading: true, asyncModule: null }
  
  componentDidMount () {
    const { module: asyncModule } = this.props
    asyncModule().then(res => {
      console.log(res)
      this.setState(state => ({
        loading: false,
        asyncModule: res.default
      }))
      console.log()
    }).catch(err => {
      alert(err)
    })
  }
  
  render () {
    const { loading, asyncModule: AsyncModule } = this.state
    return (
      loading ? <Loading /> : <AsyncModule />
    )
  }
}
