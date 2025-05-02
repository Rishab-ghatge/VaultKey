import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-slate-800 text-white'>
    <div className="mycontainer flex items-center justify-between px-6 py-5 h-14">
    <div className='logo font-bold text-2xl'>
      <span className='text-violet-400'>&lt;</span>
      <span className='text-white'>Vault</span>
      <span className='text-violet-400'>Key/&gt;</span>
      </div>
    {/* <ul>
      <li className='flex gap-5 text-lg'>
        <a className='hover:font-semibold' href="/">Home</a>
        <a className='hover:font-semibold' href="/about">About</a>
        <a className='hover:font-semibold' href="/contact">Contact Us</a>
      </li>
    </ul> */}
    <button className='text-white bg-violet-400 my-5 mx-2 rounded-full flex justify-between items-center'>
      <img className=' invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
      <span className='font-bold px-2'>Github</span>
    </button>
    </div>
   </nav>
  )
}

export default Navbar
