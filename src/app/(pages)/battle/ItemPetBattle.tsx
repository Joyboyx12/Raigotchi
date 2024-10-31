import PriceItemAccessorie from '@/app/(pages)/accessories/PriceItemAccessorie'
import imgs_battle from '@/assets/battle-screen/Battle'
import imgs_select_pet_battle from '@/assets/battle-screen/PetSelect'
import imgs_main_screen from '@/assets/main-screen'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

const ItemPetBattle = ({isDead, typeBox, img}: {isDead:any, typeBox?: string, img: StaticImageData | string}) => {
  return (
<div className='flex flex-col gap-1 items-center w-[100px]  py-1 flex-shrink-0'>
<div className="relative w-full h-[70px] bg-no-repeat"
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
    className="relative max-w-[70px] w-full h-[25px] bg-no-repeat flex items-center justify-center px-2"
    style={{
      backgroundSize: "100% 100%",
      objectFit: "fill",
      backgroundImage: `url('Pet_Select_Bottom_Active.png')`,
    }}
  >
    
    <Image
      alt="coin"
      src={isDead === 4 ? imgs_select_pet_battle.img_select_inactive : imgs_select_pet_battle.img_select_active}
      width={18}
      height={18}
    />
  </div>
</div>
  )
}

export default ItemPetBattle