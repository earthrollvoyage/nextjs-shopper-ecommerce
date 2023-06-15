import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { logo } from '../public/assets/images'
import { IoSearchOutline } from 'react-icons/io5'
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs'
import NavbarBottom from './NavbarBottom'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useSession, signIn, signOut } from 'next-auth/react'
import { addUser, removeUser } from '@/redux/shopperSlice'


const Navbar = () => {
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const productData = useSelector((state: any) => state.shopper.productData);
  const userInfo = useSelector((state: any) => state.shopper.userInfo);
  const [totalAmt, setTotalAmt] = useState('');

  useEffect(() => {
    if (session) {
      dispatch(addUser({
        name: session.user?.name,
        image: session.user?.image,
        email: session.user?.email
      }));
    } else {
      dispatch(removeUser());
    }

  }, [session, dispatch])

  useEffect(() => {
    let price = 0
    productData.map((item: any) => {
      price += item.price * item.quantity
      return price
    })
    
    setTotalAmt(price.toFixed(2))
  }, [productData])

  return (
    <div className='w-full bg-blue text-white sticky top-0 z-50'>
      <div className='w-full h-full border-b-[1px] border-b-whi'>
        <div className='max-w-container mx-auto h-20 px-4 flex items-center gap-2'>
          <Link href='/'>
            <div className='h-12 px-5 rounded-full bg-transparent flex items-center gap-2 hover: bg-hoverBg duration-300 cursor-pointer'>
              <Image src={logo} className='w-44' alt='logo' />
            </div>
          </Link>
          <Link href='/cart2'>
            <div className='h-12 px-5 rounded-full bg-transparent flex items-center gap-2 hover: bg-hoverBg duration-300 cursor-pointer'>
              <div className='w-4 grid grid-cols-2 gap-[2px]'>
                <span className='w-1.5 h-1.5 border-[1px] border-white inline-flex'></span>
                <span className='w-1.5 h-1.5 border-[1px] border-white inline-flex'></span>
                <span className='w-1.5 h-1.5 border-[1px] border-white inline-flex'></span>
                <span className='w-1.5 h-1.5 border-[1px] border-white inline-flex'></span>
              </div>
              <p className='text-base font-semibold'>Departments</p>
            </div>
          </Link>
          <Link href='/cart3'>
            <div className='h-12 px-5 rounded-full bg-transparent flex items-center gap-2 hover: bg-hoverBg duration-300 cursor-pointer'>
              <div className='w-4 grid grid-cols-2 gap-[2px]'>
                <span className='w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex'></span>
                <span className='w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex'></span>
                <span className='w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex'></span>
                <span className='w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex'></span>
              </div>
              <p className='text-base font-semibold'>Services</p>
            </div>
          </Link>
            <div className='h-10 flex flex-1 relative'>
              <input 
                className='h-full w-full rounded-full px-4 text-black text-base outline-none border-[1px] border-transparent focus-visible:border-black duration-200'
                type='text'
                placeholder='Search everything at shopper online and in store'
              />
              <span className='absolute w-8 h-8 rounded-full flex items-center justify-center top-1 right-1 bg-yellow text-black text-xl'>
                <IoSearchOutline />
              </span>
            </div>
            <div className='h-12 px-5 rounded-full bg-transparent flex items-center gap-2 hover: bg-hoverBg duration-300 cursor-pointer'>
              <AiOutlineHeart />
              <div>
                <p className='text-xs'>Recorder</p>
                <h2 className='text-base font-semibold -mt-1'>My Items</h2>
              </div>
            </div>
            {(userInfo) ? (
                <div onClick={() => signOut()} className='h-12 px-5 rounded-full bg-transparent flex items-center gap-2 hover: bg-hoverBg duration-300 cursor-pointer'>
                  <Image 
                    src={userInfo.image}
                    alt='userimage'
                    width={500}
                    height={500}
                    className='w-10 rounded-full object-cover'
                  />
                  <div>
                    <p className='text-xs'>Sign Out</p>
                    <h2 className='text-base font-semibold -mt-1'>{userInfo.name}</h2>
                  </div>
                </div>
              ) : (
                <div onClick={() => signIn()} className='h-12 px-5 rounded-full bg-transparent flex items-center gap-2 hover: bg-hoverBg duration-300 cursor-pointer'>
                  <AiOutlineUser className='text-lg'/>
                  <div>
                    <p className='text-xs'>Sign In</p>
                    <h2 className='text-base font-semibold -mt-1'>Account</h2>
                  </div>
                </div>
              )
            }
          <Link href='/cart'>
            <div className='h-12 px-5 rounded-full justify-center bg-transparent flex flex-col items-center gap-2 hover: bg-hoverBg duration-300 relative'>
              <BsCart2 />
              <p className='text-[10px] -mt-2'>${totalAmt}</p>
              <span className='absolute w-4 h-4 rounded-full flex items-center justify-center top-0 right-4 bg-yellow font-bodyFont text-xs'>
                {productData.length > 0 ? productData.length : 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <NavbarBottom />
    </div>
  )
}

export default Navbar