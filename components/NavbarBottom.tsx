import Image from 'next/image'
import React from 'react'
import { phoneImg } from '../public/assets/images'
import { FiChevronDown } from 'react-icons/fi'
import { FaPlaceOfWorship } from 'react-icons/fa'
import { MdOutlineLocationOn } from 'react-icons/md'

const NavbarBottom = () => {
  return (
    <div className='max-w-container mx-auto py-2 px-6 flex items-center  justify-between'>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-2'>
          <Image className='w-6' src={phoneImg} alt='phoneImg'/>
          <p className='text-sm font-semibold'>How do you want your items?</p>
          <FiChevronDown />
          <span className='w-[1px] h-4 bg-white inline-flex ml-2'></span>
        </div>
        <div className='flex items-center gap-2'>
          <MdOutlineLocationOn/>
          <p className='text-sm font-zinc-100'>Earthroll, 95829</p>
          <FaPlaceOfWorship />
          <p className='text-sm font-zinc-100'>Earthroll Supercenter</p>
        </div>
      </div>
      <ul className='flex gap-6 text-sm font-semibold'>
        <li className='hover:underline underline-offset-2 cursor-pointer decoration-[1px] duration-200'>Deals</li>
        <li className='hover:underline underline-offset-2 cursor-pointer decoration-[1px] duration-200'>Easter</li>
        <li className='hover:underline underline-offset-2 cursor-pointer decoration-[1px] duration-200'>Grocery & essentials</li>
        <li className='hover:underline underline-offset-2 cursor-pointer decoration-[1px] duration-200'>Home</li>
        <li className='hover:underline underline-offset-2 cursor-pointer decoration-[1px] duration-200'>Fashion</li>
        <li className='hover:underline underline-offset-2 cursor-pointer decoration-[1px] duration-200'>Auto</li>
        <li className='hover:underline underline-offset-2 cursor-pointer decoration-[1px] duration-200'>Walmart+</li>
      </ul>
    </div>
  )
}

export default NavbarBottom