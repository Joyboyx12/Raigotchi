import Image, { StaticImageData } from 'next/image'
import React from 'react'

const Item = ({img}: {img: StaticImageData}) => {
  return (
    <div className="relative w-[90px] h-[90px] bg-no-repeat"
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
  )
}

export default Item