import PriceItemAccessorie from '@/app/(pages)/accessories/PriceItemAccessorie'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

const ItemAccessorie = ({typeBox, img}: {typeBox: string, img: StaticImageData}) => {
  return (
<div className='flex flex-col items-center max-w-[90px] w-full '>
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
    <PriceItemAccessorie  price={3} typeBox={typeBox}/>
</div>
  )
}

export default ItemAccessorie