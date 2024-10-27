import ButtonSwap from '@/app/(pages)/(main-screen)/MainPage.tsx/ButtonSwap'
import Item from '@/app/(pages)/(main-screen)/MainPage.tsx/Item'
import PriceItem from '@/app/(pages)/(main-screen)/MainPage.tsx/PriceItem'
import imgs_decor from '@/assets/accessories/Decor'
import imgs_item from '@/assets/main-screen/Items'
import imgs_pet_small from '@/assets/pet/Pet_Small'
import Image from 'next/image'
import React from 'react'

const MainPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 ">
      {/* Pet */}
      <div
        className="w-full h-[300px] bg-no-repeat flex flex-col items-center justify-center"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Pet_Background.png')`,
        }}
      >
        <div className="w-full flex justify-end px-6">
          <p className="font-bold text-xl">TOD: 23h38m25s</p>
        </div>
        <div className="relative w-[200px] h-[200px]">
          <Image
            alt="pet"
            src={imgs_decor.glass_pet_idl}
            sizes="100%"
            fill
            objectFit="contain"
          />
        </div>

        <p className="font-bold text-2xl">Pet Name</p>
      </div>
      {/* Profile */}
      <div className="w-full px-2">
        <div
          className="flex w-full h-[140px] bg-no-repeat py-5 px-6 gap-7"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Pet_Tab.png')`,
          }}
        >
          <div className="relative w-[90px] h-[90px]">
            <Image
              alt="pet"
              src={imgs_pet_small.img_rail_small}
              sizes="100%"
              fill
              objectFit="contain"
              style={{ transform: "scale(-1, 1)" }}
            />
          </div>

          <div className=" text-white flex flex-col justify-center font-bold text-xl">
            <p>RAI</p>
            <div className="flex gap-5">
              <p>ATK: 100</p>
              <p>STATUS: HAPPY</p>
            </div>
            <div className="flex gap-5">
              <p>DEF: 100</p>
              <p>SCORE: 0</p>
            </div>
          </div>
          <ButtonSwap/>
        </div>
      </div>

      {/* Shop */}
      <div className="w-full px-2">
        <div
          className="flex flex-col w-full h-[220px] bg-no-repeat py-8 px-10 gap-2"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Shop_Tab.png')`,
          }}
        >
          <div className="flex gap-6">
            <Item img={imgs_item.img_water} />
            <Item img={imgs_item.img_meat} />
            <Item img={imgs_item.img_shield} />
            <Item img={imgs_item.img_holy_water} />
          </div>

          <div className="flex text-white font-bold text-xl items-center gap-11 px-3">
        
          <PriceItem price={5} nameItem="Water"/>

            <PriceItem price={5} nameItem="Beef"/>
            <PriceItem price={5} nameItem="Shield"/>
            <PriceItem price={5}  nameItem="Holy Water"/>
          </div>

      
        </div>
      </div>
    </div>
  )
}

export default MainPage