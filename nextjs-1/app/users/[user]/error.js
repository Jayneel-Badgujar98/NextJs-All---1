"use client"
import React from 'react'

const error = ({error,reset}) => {
  return (
    <div>
        <h1>Something went wrong</h1>
        <h2>error</h2>
        <div>{error.message}</div>
        <button onClick = {() =>reset()}>Try again</button>
    </div>
  )
}

export default error