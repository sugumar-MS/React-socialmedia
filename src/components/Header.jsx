import React from 'react'
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

const Header = ({width,tittle}) => {
  return (
    <div className='Header'>
      <h2>{tittle}</h2>
      <div className='windowSize'>
      {width<760? <FaMobileAlt/>
      :width<992? <FaTabletAlt/>
    :<FaLaptop/>}
  
      </div>
    </div>
  )
}

export default Header
