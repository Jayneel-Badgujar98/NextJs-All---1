"use client"
import React from 'react'

const error = ({ error, reset }) => {
  return (
    <div>
      <div>Something went wrong</div>
      <div>error - {error.message} of github</div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default error