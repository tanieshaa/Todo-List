import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-[#21152c] text-white p-4'>
      <div className='logo'>
        <span className='font-bold text-xl mx-8 hover:cursor-default'>My To-Do</span>
      </div>
      <ul className='flex gap-8 mx-9'>
        <li className='hover:cursor-pointer font-normal hover:font-bold transition-all '>Home</li>
        <li className='hover:cursor-pointer font-normal hover:font-bold transition-all '>Your Tasks</li>
      </ul>
    </div>
  )
}

export default Navbar
