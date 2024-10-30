import PriceItemAccessorie from '@/app/(pages)/accessories/PriceItemAccessorie'
import imgs_main_screen from '@/assets/main-screen'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

const ItemPetMint = ({typeBox, img}: {typeBox?: string, img: StaticImageData}) => {
  return (
<div className='flex flex-col gap-1 items-center max-w-[90px] w-full '>
<div className="relative w-full h-[60px] sm:h-[90px] bg-no-repeat"
    style={{
      backgroundSize: "100% 100%",
      objectFit: "fill",
      backgroundImage: `url('/ItemBox.png')`,
    }}>
      <Image
        alt="pet"
        src={img}
        sizes="100%"
        fill
        objectFit="contain"
     
      />
    </div>
    <div
    className="relative max-w-[70px] w-full h-[30px] bg-no-repeat flex items-center justify-center px-2"
    style={{
      backgroundSize: "100% 100%",
      objectFit: "fill",
      backgroundImage: `url('Price_Box_2.png')`,
    }}
  >
    
    <Image
      alt="coin"
      src={imgs_main_screen.img_coin_icon}
      width={18}
      height={18}
    />
  </div>
</div>
  )
}

export default ItemPetMint