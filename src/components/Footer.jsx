import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full'>
        <div className='logo font-bold text-xl'>
        <span className='text-violet-400'>&lt;</span>
        <span className='text-white'>Vault</span>
        <span className='text-violet-400'>Key/&gt;</span>
      </div>
      <div className='flex text-violet-100'>
         We don't just store your passwords, we protect them
      </div>
    </div>
  )
}

export default Footer
