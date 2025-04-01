import React from 'react'

const Footer = () => {
    const today=new Date();
  return (
    <div className='Footer'>
      <p>Copyright &copy; {today.getFullYear()}</p>
    </div>
  )
}

export default Footer
