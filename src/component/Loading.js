import React from 'react'

const wrapStyle = {
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '10',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default () => {
  return (
    <div style={wrapStyle}>
      <h1>Loading...</h1>
    </div>
  )
}