"use client"
// This is the error.js file in the blog/[post] directory
import React from 'react'

const error = ({error , reset}) => {
  return (
    <>
    <div>{error.message}</div>
    <button onClick = {() =>reset()}>Try again</button>
    </>
  )
}

export default error