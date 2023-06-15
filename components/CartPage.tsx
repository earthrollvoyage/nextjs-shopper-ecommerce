import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { phoneImg, ship1Img, ship2Img, ship3Img, warningImg } from '@/public/assets/images';
import { StoreProduct } from '@/type';
import { TbReload } from 'react-icons/tb'
import { HiMinusSmall } from 'react-icons/hi2'
import { MdOutlineAdd } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import FormatePrice from './FormatePrice';
import { deleteItem, minusQuantity, plusQuantity, resetCart } from '@/redux/shopperSlice';
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSession } from 'next-auth/react';

const CartPage = () => {
  const dispatch = useDispatch()
  const {data: session} = useSession();
  const stripePomise = loadStripe(process.env.strip_public_key!)
  const productData = useSelector((state: any) => state.shopper.productData);
  const userInfo = useSelector((state: any) => state.shopper.userInfo);
  const [warningMsg, setWarningMsg] = useState(false);

  const [totalOldPrice, setTotalOldPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    setWarningMsg(!warningMsg);
    let oldPrice = 0;
    let savings = 0;
    let amt = 0;
    
    productData.map((item: StoreProduct) => {
      oldPrice += item.oldPrice * item.quantity;
      savings += item.oldPrice - item.price;
      amt += item.price * item.quantity;
    return
    });

    setTotalOldPrice(oldPrice)
    setTotalSavings(savings)
    setTotalAmt(amt)

  }, [productData])

  const handleCheckout = async () => {
    const stripe = await stripePomise;
    
    //Create a checkout session
    const checkoutSession = await axios.post('api/create-checkout-session', {
      items: productData,
      email: session?.user?.email
    })
    
    //Redirecting user to Stripe Checkout
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result?.error) alert(result?.error.message)
  }

  return (
    <div className='w-full py-10'>
      <div className='w-full flex gap-10'>
        <div className='w-2/3 flex flex-col gap-5'>
          <h1 className='text-2xl font-bold text-black'>
            Cart{' '}
            <span className='text-lightText font-normal'>({productData.length} items)</span>
          </h1>
          <div className='text-xl font-bold flex items-center gap-2 mb-2'>
            <Image className='w-10' src={phoneImg} alt='phoneImg' />
            <p>Pickup and delivery options</p>
          </div>
          <div>
            <div className='w-full grid grid-cols-3 gap-4 text-xs'>
              <div className='w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center gap-1 p-2'>
                <Image className='w-10' src={ship1Img} alt='shippingImag' />
                <p className='font-bold'>Shipping</p>
                <p>All items available</p>
              </div>
              <div className='w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center gap-1 p-2'>
                <Image className='w-10' src={ship2Img} alt='shippingImag' />
                <p className='font-bold'>pickup</p>
                <p>All items available</p>
              </div>
              <div className='w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center gap-1 p-2'>
                <Image className='w-10' src={ship3Img} alt='shippingImag' />
                <p className='font-bold'>Delivery</p>
                <p>A11 items available</p>
              </div>
            </div>
            <div className='w-full p-5 border-[1px] border-zinc-400 rounded-md flex flex-col gap-4 mt-5'>
              <p className='font-semibold text-sm text-zinc-500'>
                {' '}
                Sold and shipped by <span className='text-black font-semibold'>Shoppers.com</span>
              </p>
              <div className="flex gap-2">
                <button className="px-2 py-[1px] text-hoverBg text-sm border-[1px] border-hoverBg rounded-sm" >
                  Best seller
                </button>
                <button className="px-2 py-[1px] text-red-600 text-sm border-[1px] border-red-600 rounded-sm">
                  Rollback
                </button>
              </div>
              <div>
                {
                  productData.map((item: StoreProduct) => (
                    <div 
                      key={item._id}
                      className='flex items-center justify-between gap-4 border-b-[1px] border-b-zinc-200 pb-4'
                    >
                      <div className='w-3/4 flex items-center gap-5'>
                        <Image 
                          className='w-32'
                          src={item.image}
                          width={300}
                          height={300}
                          alt='productImg'
                        />
                        <div>
                          <h2 className='text-base text-zinc-900'>
                            {item.title}
                          </h2>
                          <p className='text-sm text-zinc-500'>{item.des}</p>
                          <p className='text-sm text-zinc-500'>{item.price}</p>
                          <p className='text-sm text-zinc-500 flex items-center gap-1'>
                            <span className='w-4 h-4 bg-blue rounded-full text-white text-xs w-4 flex items-center justify-center'>
                              <TbReload className='rotate-180' />
                            </span>
                            Free 30-day returns
                          </p>
                          <div className='mt-2 flex items-center gap-6'>
                            <button 
                              onClick={() => dispatch(deleteItem(item._id))}
                              className='text-sm underline underline-offset-2 decoration-[1px] text-zinc-600 hover:no-underline hover:text-blue duration-300'
                            >
                              Remove
                            </button>
                            <div className='w-28 h-9 border border-zinc-400 rounded-full text-base -font-semibold text-black flex items-center justify-between px-3'>
                              <button onClick={() => dispatch(minusQuantity({
                                  _id: item._id,
                                  title: item.title,
                                  des: item.des,
                                  oldPrice: item.oldPrice,
                                  price: item.price,
                                  brand: item.brand,
                                  quantity: 1,
                                  image: item.image,
                                  category: item.category
                                }))} 
                                className='text-base w-5 h-5 text-zinc-600 hover:bg-grayLight hover:text-white rounded-full flex items-center justify-center cursor-pointer duration-200'
                              >
                                <HiMinusSmall />
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => dispatch(plusQuantity({
                                  _id: item._id,
                                  title: item.title,
                                  des: item.des,
                                  oldPrice: item.oldPrice,
                                  price: item.price,
                                  brand: item.brand,
                                  quantity: 1,
                                  image: item.image,
                                  category: item.category
                                }))} 
                                className='text-base w-5 h-5 text-zinc-600 hover:bg-grayLight hover:text-white rounded-full flex items-center justify-center cursor-pointer duration-200'
                              >
                                <MdOutlineAdd />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-1/4 text-right flex flex-col items-end gap-1'>
                        <p className='font-semibold text-xl text-greenLight'>
                          <FormatePrice amount={item.price * item.quantity} />
                        </p>
                        <p className='text-sm line-through text-zinc-500'>
                          <FormatePrice amount={item.oldPrice * item.quantity} />
                        </p>
                        <div className='flex items-center text-xs gap-2'>
                          <p className='bg-green-200 text-[8px] uppercase px-2 py-[1px]'>
                            You save
                          </p>
                          <p className='text-greenLight font-semibold'>
                            <FormatePrice
                              amount={(item.oldPrice * item.quantity) - (item.price * item.quantity)}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <button 
                onClick={() => dispatch(resetCart())} 
                className='w-44 bg-red-500 text-white h-10 rounded-full text-base font-semibold hover:bg-red-800 duration-300'
              >
                Reset Cart
              </button>
            </div>
          </div>
        </div>
        <div className='w-1/3 p-4 mt-24 h-[500px] border-[1px] border-zinc-400 rounded-md flex flex-col justify-center gap-4'>
          <div className='w-full flex flex-col gap-4 border-b-[1px] border-b-zinc-200 pb-4'>
            {(userInfo) ? (
              <button 
                onClick={handleCheckout}
                className='bg-blue hover:bg-hoverBg w-full text-white h-10 rounded-full font-semibold duration-300'
              >
                Continue to checkout
              </button>
            ) : (
              <button className='bg-blue bg-opacity-50 cursor-not-allowed w-full text-white h-10 rounded-full font-semibold duration-300'>
                Continue to checkout
              </button>
            )}
            {(!userInfo) && (
              <p className='text-sm text-center text-red-500 -mt-4 font-semibold'>
                Please sign in for checkout 
              </p>
            )}
            {warningMsg && (
              <div className='bg-warningCartBlue text-white p-2 rounded-lg flex items-center justify-between gap-4'>
                <Image className='w-8' src={warningImg} alt='warningImg'/>
                <p className='text-sm'>
                  Items in your cart have reduced prices. Check out now or extra savings!
                </p>
                <IoMdClose 
                  onClick={() => setWarningMsg(!warningMsg)}
                  className='text-3xl hover:text-red-400 cursor-pointer duration-200' 
                />
              </div>
            )}
            <p className='text-sm text-center'>
              For the best shopping experience, {' '}
              <span className='underline underline-offset-2 decoration-[1px]'>
                sign in
              </span>
            </p>
          </div>
          <div className='w-full flex flex-col gap-4 border-b-[1px] border-b-zinc-200 pb-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm flex justify-between'>
                <p className='font-semibold'>Subtotal <span>({productData.length} items)</span></p>
                <p className='line-through text-zinc-500 text-base'><FormatePrice amount={totalOldPrice}/></p>
              </div>
              <div className='text-sm flex justify-between'>
                <p className='font-semibold'>Savings</p>
                <p className='text-greenLight font-bold bg-green-100 py-1 px-[2px] rouned-lg flex'>
                  -<FormatePrice amount={totalSavings} />
                </p>
              </div>
              <div className='text-sm flex justify-between'>
                <p className='font-semibold'>Total Amount</p>
                <p className='text-zinc-800 font-normal text-base'>
                  <FormatePrice amount={totalAmt} />
                </p>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4 border-b-[1px] border-b-zinc-200 pb-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm flex justify-between'>
                <p>Shipping</p>
                <p className='text-greenLight'>Free</p>
              </div>
              <div className='text-sm flex justify-between'>
                <p className='font-semibold'>Taxes</p>
                <p className='text-zinc-800'>calculated at checkout</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <p>Estimated total</p>
            <p className='text-zinc-800 font-bold text-lg'>
              <FormatePrice amount={totalAmt} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage