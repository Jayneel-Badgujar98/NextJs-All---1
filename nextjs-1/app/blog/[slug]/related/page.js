import React from 'react'

const related = ({params}) => {
  return (
    <div>
      <h1>Related Content for this name :- {params.slug}</h1>
    </div>
  )
}

export default related