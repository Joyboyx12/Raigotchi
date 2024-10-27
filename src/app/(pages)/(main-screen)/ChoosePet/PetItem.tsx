import ButtonSwapPet from "@/app/(pages)/(main-screen)/ChoosePet/ButtonSwapPet";
import imgs_pet_small from "@/assets/pet/PetSmall";
import Image, { StaticImageData } from "next/image";
import React from "react";

const PetItem = ({name, status, img, atk, def}: {name: string, status: string, img:StaticImageData, atk: number, def: number}) => {
  return (
    <div
      className="flex w-full h-[120px] bg-no-repeat py-5 px-6 "
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/Pet_swap_Tab.png')`,
      }}
    >
      <div className="relative w-[90px] h-[90px]">
        <Image
          alt="pet"
          src={img}
          sizes="100%"
          fill
          objectFit="contain"
          style={{ transform: "scale(-1, 1)" }}
        />
      </div>
      <div className=" h-full w-full flex flex-col gap-2 pl-11 ">
        <div className="flex items-center justify-between">
            <p className="w-full">{name}</p>
            <p className="w-full">Status: {status}</p>

        </div>

        <div className="flex items-center justify-between  ">
            <div className="flex gap-2">
            <p>Atk: {atk}</p>
            <p>Def: {def}</p>
            </div>
            <ButtonSwapPet/>

        </div>  
      </div>
    </div>
  );
};

export default PetItem;
