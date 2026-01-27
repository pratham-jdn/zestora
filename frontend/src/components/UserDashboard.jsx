import React from 'react'
import Nav from './Nav'

const UserDashboard = () => {
  return (
    <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible'>
        <Nav/>
    </div>
  )
}

export default UserDashboard