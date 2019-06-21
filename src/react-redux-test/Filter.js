import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setVisibilityFilter } from './actionCreator'

class Filter extends Component{
  render () {
    const { visibilityFilter, dispatch } = this.props
    return (
      <div>
        Filter: 
        <button 
          disabled={visibilityFilter === 'SHOW_ALL'} 
          onClick={() => dispatch(setVisibilityFilter('SHOW_ALL'))}>
            ALL
        </button>
        <button 
          disabled={visibilityFilter === 'SHOW_COMPLETED'} 
          onClick={() => dispatch(setVisibilityFilter('SHOW_COMPLETED'))}>
            Completed
        </button>
        <button 
          disabled={visibilityFilter === 'SHOW_ACTIVE'} 
          onClick={() => dispatch(setVisibilityFilter('SHOW_ACTIVE'))}>
            Active
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  visibilityFilter: state.visibilityFilter
})

export default connect(mapStateToProps)(Filter)
