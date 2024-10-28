import imgs_main_screen from "@/assets/main-screen";
import Image from "next/image";
import React from "react";

const PriceItem = ({
  nameItem,
  price,
}: {
  nameItem: string;
  price: number;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 text-center items-center justify-center">
      <p className="w-[50%] leading-4 h-7 flex items-center justify-center text-4xl">
        {nameItem}
      </p>
      <div
        className="relative max-w-[70px] w-full h-[30px] bg-no-repeat flex items-center justify-between px-2"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Price_Box.png')`,
        }}
      >
        <p className="text-4xl pb-2">5</p>
        <Image
          alt="coin"
          src={imgs_main_screen.img_coin_icon}
          width={18}
          height={18}
        />
      </div>
    </div>
  );
};

export default PriceItem;
