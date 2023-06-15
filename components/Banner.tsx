import React from 'react'
import Image from 'next/image';
import Slider from 'react-slick'

import { bannerImg,
  sliderImgOne,
  sliderImgTwo,
  sliderImgThree,
  sliderImgFour,
  sliderImgFive
} from '../public/assets/images'
import BannerText from './BannerText';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import ButtonPrimary from './ButtonPrimary';

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute bottom-12 left-6 w-12 h-8 border-[1px] shadow-md border-black
      text-black bg-white text-x1 flex items-center justify-center rounded-md
      hover:bg-blue hover:border-transparent hover:text-white cursor-pointer
      duration-300 z-10"
      onClick={onClick}
    >
      <BsArrowLeft />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute bottom-12 right-6 w-12 h-8 border-[1px] shadow-md border-black
      text-black bg-white text-x1 flex items-center justify-center rounded-md
      hover:bg-blue hover:border-transparent hover:text-white cursor-pointer
      duration-300 z-10"
      onClick={onClick}
    >
      <BsArrowRight />
    </div>
  );
}

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className='w-full bg-white px-4 py-6 font-titleFont flex gap-4 border-b-[1px]'>
      <div className='w-2/3 rounded-lg h-[410px] shadow-md relative'>
        <Slider {...settings}>
          <div className='w-fill h-[410px] relative'>
            <Image 
              className='w-fill h-full object-cover rounded-lg'
              src={sliderImgOne} 
              alt='sliderImgOne' 
              priority 
            />
            <BannerText
              className='absolute w-60 h-full top-6 left-4 flex flex-col gap-3 text-white'
              title='Spring fashion in bloom'
              description='New trends & styles o turn heads anytime, on any budget.'
              btnText='Shop now'
            />
          </div>
          <div className='w-fill h-[410px] relative'>
            <Image 
              className='w-fill h-full object-cover rounded-lg'
              src={sliderImgTwo} 
              alt='sliderImgTwo' 
              priority 
            />
            <BannerText
              className='absolute w-60 h-full top-6 left-4 flex flex-col gap-3 text-white'
              title='Up to 65% 0ff'
              description='New saving every week! Hurry to score low, low prices.'
              btnText='Shop now'
            />
          </div>
          <div className='w-fill h-[410px] relative'>
            <Image 
              className='w-fill h-full object-cover rounded-lg'
              src={sliderImgThree} 
              alt='sliderImgThree' 
              priority 
            />
            <BannerText
              className='absolute w-60 h-full top-6 left-4 flex flex-col gap-3 text-blue'
              title='You can save $1,300 a year!*'
              description='Start saving with free delivery, Walmart Requards & more'
              btnText='Try free'
            />
          </div>
          <div className='w-fill h-[410px] relative'>
            <Image 
              className='w-fill h-full object-cover rounded-lg'
              src={sliderImgFour} 
              alt='sliderImgFour' 
              priority 
            />
            <BannerText
              className='absolute w-60 h-full top-6 left-4 flex flex-col gap-3 text-black'
              title='Up to 65% 0ff'
              description='New saving every week! Hurry to score low, low prices.'
              btnText='Shop now'
            />
          </div>
          <div className='w-fill h-[410px] relative'>
            <Image 
              className='w-fill h-full object-cover rounded-lg'
              src={sliderImgFour} 
              alt='sliderImgFour' 
              priority 
            />
            <BannerText
              className='absolute w-60 h-full top-6 left-4 flex flex-col gap-3 text-black'
              title='Up to 65% 0ff'
              description='New saving every week! Hurry to score low, low prices.'
              btnText='Shop now'
            />
          </div>
        </Slider>
      </div>
      <div className='w-1/3 border-[1px] border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-black'>
            Flash Pick of the day
          </h2>
          <p className='text-base text-zinc-600 underline underline-offset-2'>
            View all
          </p>
        </div>
        <Image className='h-60 object-cover' src={bannerImg} alt='flashsale'/>
        <ButtonPrimary btnText='Options' />
        <p className='text-lg text-black font-semibold'>From $199.90</p>
        <p className='text-base text-gray-500 -mt-1'>uhomepro TV Stand Cabiet for Living Room...</p>
      </div>
    </div>
  )
}

export default Banner