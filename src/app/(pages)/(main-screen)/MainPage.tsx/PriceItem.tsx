import imgs_main_screen from '@/assets/main-screen'
import Image from 'next/image'
import React from 'react'

const PriceItem = ({nameItem, price}: {nameItem: string, price: number}) => {
  return (
   <div className='w-full flex flex-col gap-1 text-center'>
<p className='text-base leading-4 h-7 flex items-center justify-center'>{nameItem}</p>
<div 
    className="relative w-[70px] h-[30px] bg-no-repeat flex items-center justify-between px-2"
    style={{
      backgroundSize: "100% 100%",
      objectFit: "fill",
      backgroundImage: `url('/Price_Box.png')`,
    }}>
    <p>5</p>
    <Image alt="coin" src={imgs_main_screen.img_coin_icon} width={18} height={18}/>
    </div>
   </div>
  )
}

export default PriceItem