import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { BsStarFill, BsInfoCircle } from 'react-icons/bs'
import { ship1Img, ship2Img, ship3Img } from '../../public/assets/images'
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/shopperSlice';
import toast, { Toaster } from 'react-hot-toast'

const ProductDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [product, setProduct] = useState<any>({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(!isLoading);
    setProduct(router.query);
    setLoading(!isLoading);
  }, [])

  const _id = Number(product._id)

  return (
    <div className='w-full bg-white flex items-center justify-center'>
      <div className='max-w-contentContainer max-auto flex items-center justify-center p-4'>
        <div className='w-2/3 h-full flex items-center justify-center overflow-hidden relative'>
          <img 
            src={product.image} 
            alt='productImg'
            className='w-[80%] transform-origin-top-left cursor-move duration-500'
          />
        </div>
        <div className='w-1/3 h-full flex flex-col gap-2'>
          <p className='p-2 text-hoverBg text-sn font-semibold border border-gray-400 rounded-md'>500+ bought since yesterday</p>
          <div className='px-2 py-4 border border-gray-400 rounded-md flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <button className='px-2 py-[1px] text-hoverBg text-sm border-[1px] border-hoverBg rounded-sm'>Best seller</button>
                <button className='px-2 py-[1px] text-red-600 text-sm border-[1px] border-red-600 rounded-sm'>Rollback</button>
              </div>
              <IoMdHeartEmpty className='text-gray-600 text-2xl' />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-sm underline underline-offset-4'>{product.brand}</p>
              <p className='text-xl font-semibold text-black'>{product.title}</p>
              <p className='text-base text-zinc-500'>{product.des}</p>
              <div className='flex gap-2 items-centert text-xs mt-2'>
                <div className='flex gap-1'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <p>25</p>
              </div>
              <div className='flex items-end gap-2'>
                <p className='font-semibold text-2xl text-greenLight'>
                  Now ${product.price}
                </p>
                <p className='text-sm text-zinc-500 line-through flex items-center gap-1'>
                  ${product.oldPrice}{' '}
                  <span>
                    <BsInfoCircle />
                  </span>
                </p>
              </div>
            </div>
            <div className="text-sm text-black flex flex-col gap-1">
              <p>
                <span className="font-semibold">$18/mo</span>{" "}
                <span className="font-bold">withAffirm</span>{" "}
                <span className="underline underline-offset-2">Learn howk</span>
              </p>
              <p className="text-xs ㆍtext-zinc-500 flex items-center gap-1">
                Price when purchased online
                <span>
                  <BsInfoCircle />
                </span>
              </p>
            </div>
            <div className='border-b-[1px] border-b-zinc-300 pb-4'>
              <button 
                className='w-32 h-10 bg-blue text-white rounded-full hover:bg-hoverBg duration-300'
                onClick={() => dispatch(addToCart({
                  _id: product._id,
                  title: product.title,
                  des: product.des,
                  oldPrice: product.oldPrice,
                  price: product.price,
                  brand: product.brand,
                  image: product.image,
                  quantity: 1,
                  category: product.category
                })) && toast.success(`${product.title.substring(0, 20)} is added to cart`)}
              >
                Add to cart
              </button>
            </div>
            <div>
              <p className='text-base font-semibold'>How do you want your item?</p>
              <div className='w-full grid grid-cols-3 gap-4 text-xs'>
                <div className='w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2'>
                  <Image className='w-10' src={ship1Img} alt='shippingImg'/>
                  <p>Shipping</p>
                  <p>Tomorrow</p>
                  <p>Free</p>
                </div>
                <div className='w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2'>
                  <Image className='w-10' src={ship2Img} alt='shippingImg'/>
                  <p>Pickup</p>
                  <p>Tomorrow</p>
                  <p>Free</p>
                </div>
                <div className='w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2'>
                  <Image className='w-10' src={ship3Img} alt='shippingImg'/>
                  <p>Delivery</p>
                  <p>Tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster 
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff'
          }
        }}
      />
    </div>
  )
}

export default ProductDetails