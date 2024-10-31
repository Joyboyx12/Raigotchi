import { IItem } from "@/app/(pages)/(main-screen)/MainPet";
import imgs_main_screen from "@/assets/main-screen";
import Image, { StaticImageData } from "next/image";
import React from "react";

const Item = ({
 item,
 handleBuyImidiateUseItem,
}: {
  item: IItem,
  handleBuyImidiateUseItem: (itemId: number) => void,
}) => {
  return (
    <div className="flex flex-col">
      <button
      onClick={() => {
        handleBuyImidiateUseItem(item.id)
      }}
      
        className="relative w-[90px] h-[60px] sm:h-[90px] bg-no-repeat"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/ItemBox.png')`,
        }}
      >
        <Image alt="pet" src={item.image} sizes="100%" fill objectFit="contain" />
      </button>

      <div className="w-full flex flex-col gap-2 text-center items-center justify-center">
        <p className="w-[50%] leading-4 h-7 flex items-center justify-center text-4xl">
         {item.name}
        </p>
        <div
          className="relative max-w-[70px] w-full h-[30px] bg-no-repeat flex items-center justify-between px-2"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Price_Box.png')`,
          }}
        >
          <p className="text-4xl pb-2">{item.price}</p>
          <Image
            alt="coin"
            src={imgs_main_screen.img_coin_icon}
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
