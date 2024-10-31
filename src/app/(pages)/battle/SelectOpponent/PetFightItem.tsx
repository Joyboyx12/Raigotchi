import ButtonSwapPet from "@/app/(pages)/(main-screen)/ChoosePet/ButtonSwapPet";
import imgs_pvp_list from "@/assets/battle-screen/PVPList";
import imgs_pet_small from "@/assets/pet/PetSmall";
import { IPetByOwner, useAppContext } from "@/contexts/AppContext";
import { statusLabels } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";


const PetFightItem = ({
 pet
}: {
  pet:IPetByOwner
}) => {

  const {nextStep, setCurrentPetFight} = useAppContext()


const handleNextStep = () => {
  nextStep();
  setCurrentPetFight(pet)
}

  const displayStatus = statusLabels[pet._status] || "Unknown Status";
  return (
    <div
      className="flex w-full h-[140px] bg-no-repeat py-6 px-4 sm:px-6 gap-3 text-black "
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/Battle_PVP_List_Tab.png')`,
      }}
    >
      <div
        className="flex  items-center justify-center max-w-[100px] h-[85px] w-full bg-no-repeat"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Swap_Box_1.png')`,
        }}
      >
        <div className="relative max-w-[90px] w-full h-[90px]">
          <Image
            alt="pet"
            src={pet._image}
            sizes="100%"
            fill
            objectFit="contain"
            style={{ transform: "scale(-1, 1)" }}
          />
        </div>
      </div>

      <div className=" h-full w-full flex flex-col gap-2  ">
        <div className="flex items-center space-x-2 ">
          <div
            className="flex  items-center justify-center max-w-[160px] h-[30px] w-full bg-no-repeat px-2"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Swap_Box_2.png')`,
            }}
          >
            <p className="w-full font-bold sm:text-xl">{pet._name || "Pet Name"}</p>
          </div>

<div className="w-5 h-1 bg-white "></div>
          <div
            className="flex  items-center justify-center max-w-[175px] h-[30px] w-full bg-no-repeat px-2"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Swap_Box_2.png')`,
            }}
          >
            <p className="w-full font-bold sm:text-xl">Status: {displayStatus}</p>
          </div>
        </div>

        <div className="flex gap-2 items-center  justify-between  ">
        <div
            className="flex gap-1 sm:gap-4 items-center max-w-[230px] h-[45px] w-full bg-no-repeat px-2 font-bold sm:text-2xl"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Swap_Box_4.png')`,
            }}
          >
          
            <p>Atk: {Number(pet._attackPoints)}</p>
            <p>Def: {Number(pet._defensePoints)}</p>
          
          </div>
          
          <button
          onClick={handleNextStep}
          >
          <Image alt="swap" src={imgs_pvp_list.img_fight_button} width={120} height={100}/>
    
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetFightItem;
