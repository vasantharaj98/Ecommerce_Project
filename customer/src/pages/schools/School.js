import React from 'react'

const School = ({show}) => {
  return (
    <div  className='content' style={{marginLeft: show ? '270px' : '30px'}}>School</div>
  )
}

export default School