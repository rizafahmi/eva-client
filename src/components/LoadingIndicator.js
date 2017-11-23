import React from 'react'

const LoadingIndicator = props => {
  return (
    <div
      style={{
        backgroundColor: '#def4e5',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30
      }}
    >
      {props.title}
    </div>
  )
}

export default LoadingIndicator
