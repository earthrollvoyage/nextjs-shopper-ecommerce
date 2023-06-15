import { Product, ProductItem } from '@/type'
import Image from 'next/image'
import React from 'react'
import { GoPlus } from 'react-icons/go'
import { BsStarFill } from 'react-icons/bs'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/shopperSlice'
import toast, { Toaster } from 'react-hot-toast'
 
interface Props {
  productData: any
}

const Products = ({ productData }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className='py-6 px-4 grid grid-cols-4 gap-4'>
      {
        productData.map((item: ProductItem) => (
          <div key={item._id} className='border-[1px] border-gray-200 mb-6 group'>
            <div className='w-full h-[350px] overflow-hidden p-1'>
              <Image 
                width={300} 
                height={250} 
                src={item.image}
                alt='itemImage'
                className='w-full h-full object-contain scale-100 group-hover:scale-105 duration-300'
              />
            </div>
            <div className='px-2 py-4 flex flex-col justify-center'>
              <div className='flex justify-between py-2'>
                <button 
                  onClick={() => dispatch(addToCart({
                    _id: item._id,
                    title: item.title,
                    des: item.des,
                    oldPrice: item.oldPrice,
                    price: item.price,
                    brand: item.brand,
                    image: item.image,
                    quantity: 1,
                    category: item.category
                  })) && toast.success(`${item.title.substring(0, 20)} is added to cart`) } 
                  className='w-20 h-9 bg-blue text-white rounded-full flex gap-1 items-center justify-center hover:bg-hoverBg duration-300'
                >
                  <span><GoPlus /></span>
                  Add
                </button>
                <Link href={{
                  pathname: `product/${item._id}`,
                  query: {
                    _id: item._id,
                    title: item.title,
                    des: item.des,
                    oldPrice: item.oldPrice,
                    price: item.price,
                    brand: item.brand,
                    image: item.image,
                    isNew: item.isNew,
                    category: item.category
                  },
                }}
                as={`product/${item._id}`}
                >
                  <button className='w-20 h-9 bg-white text-black border-[1px] border-black rounded-full flex gap-1 items-center justify-center hover:bg-black hover:text-white duration-300'>
                    <span><GoPlus /></span>
                    Details
                  </button>
                </Link>
              </div>
              <div className='flex items-center gap-3'>
                <p className='font-titleFont text-lg text-green-700 font-semibold'>Now ${item.price}</p>
                <p className='text-gray-500 line-through decoration-[1px]'>{item.oldPrice}</p>
              </div>
              <p className='text-lg font-semibold py-2'>{item.title.substring(0, 25)}</p>
              <p className='text-base text-zinc-500'>{item.des.substring(0, 80)}</p>
              <div className='flex gap-2 items-center text-sm mt-2'>
                <div className='flex text-sm gap-1'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <p>25</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
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

export default Products