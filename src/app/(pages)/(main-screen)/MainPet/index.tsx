import ButtonSwap from "@/app/(pages)/(main-screen)/MainPet/ButtonSwap";
import Item from "@/app/(pages)/(main-screen)/MainPet/Item";
import PetView from "@/app/(pages)/(main-screen)/MainPet/PetView";
import PriceItem from "@/app/(pages)/(main-screen)/MainPet/PriceItem";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_item from "@/assets/main-screen/Items";
import imgs_pet_small from "@/assets/pet/PetSmall";
import Image from "next/image";
import React from "react";

const MainPet = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 ">
      {/* Pet */}
      <PetView />
      {/* Profile */}
      <div className="w-full px-2">
        <div
          className="flex  w-full h-[140px] bg-no-repeat py-5 px-3 sm:pl-5 sm:pr-8 gap-3 "
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Pet_Tab_Bg.png')`,
          }}
        >
          <div
            className="flex  items-center justify-center max-w-[110px] h-[90px] w-full bg-no-repeat"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Pet_Tab_Box.png')`,
            }}
          >
            <div className="relative w-full h-[75px]">
              <Image
                alt="pet"
                src={imgs_pet_small.img_rail_small}
                sizes="100%"
                fill
                objectFit="contain"
                style={{ transform: "scale(-1, 1)" }}
              />
            </div>
          </div>

          <div className="w-full text-white flex flex-col  justify-center font-bold text-xs sm:text-xl">
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

          <ButtonSwap />
        </div>
      </div>

      {/* Shop */}
      <div className="w-full px-2">
        <div
          className="flex flex-col w-full h-[220px] bg-no-repeat px-3 py-8 sm:px-10 gap-2"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Shop_Tab.png')`,
          }}
        >
          <div className="flex gap-2 sm:gap-6">
            <Item img={imgs_item.img_water} />
            <Item img={imgs_item.img_meat} />
            <Item img={imgs_item.img_shield} />
            <Item img={imgs_item.img_holy_water} />
          </div>

          <div className="flex text-white font-bold text-xl items-center justify-between ">
            <PriceItem price={5} nameItem="Water" />

            <PriceItem price={5} nameItem="Beef" />
            <PriceItem price={5} nameItem="Shield" />
            <PriceItem price={5} nameItem="Holy Water" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPet;
