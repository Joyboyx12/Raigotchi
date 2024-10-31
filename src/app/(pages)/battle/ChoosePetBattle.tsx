"use client";
import ItemPetBattle from "@/app/(pages)/battle/ItemPetBattle";
import PetViewSelectBattle from "@/app/(pages)/battle/PetViewSelectBattle";

import ItemPetMint from "@/app/(pages)/mint/ItemPetMint";
import PetViewMint from "@/app/(pages)/mint/PetViewMint";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_select_pet_battle from "@/assets/battle-screen/PetSelect";
import imgs_mint from "@/assets/mint-screen/Assets";
import imgs_pet_small from "@/assets/pet/PetSmall";
import { Spinner } from "@/components/ui/spinner";
import { IPets, useAppContext } from "@/contexts/AppContext";
import { toast, useToast } from "@/hooks/use-toast";
import { addressContracts } from "@/lib/utils";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";



const PETS: IPets[] = [
  {
    id: 0,
    image: "",
    name: "Pet 1",
    attackPoints: "150",
    defensePoints: "50",
    nextEvolutionLevel: "1",
  },
  {
    id: 1,
    image: "",
    name: "Pet 2",
    attackPoints: "200",
    defensePoints: "50",
    nextEvolutionLevel: "1",
  },
];

const ChoosePetBattle = () => {
  


  const {petsByOwner,setCurrentPet,currentPet, nextStep} = useAppContext()
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full px-2">
      {petsByOwner.length <= 0 ? (
        <Spinner />
      ) : (
        <>
          <PetViewSelectBattle
            pets={petsByOwner && petsByOwner}
            setCurrentPet={setCurrentPet}
            currentPet={currentPet}
   
          />

          <div
            className="w-full h-[280px]  bg-no-repeat p-6"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Pet_Select_Bottom_Tab.png')`,
            }}
          >
            <div className="w-full h-full grid grid-rows-2 grid-flow-col gap-2 overflow-x-auto custom-scrollbar">
              {petsByOwner.length <= 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                petsByOwner.map((pet, index) => (
                  <ItemPetBattle
                    key={index}
                    img={pet._image || imgs_pet_small.img_base_small}
                    isDead={pet._status}
                  />
                ))
              )}
            </div>
          </div>
          <button
          onClick={() => {
            if(currentPet?._status === 4) {
              toast({
                title: "Battle Failed",
               description: "You can't battle with dead pet"
              })
              return
            }
            nextStep()
            console.log("currentPet",currentPet)
          }
          }
          >
            <Image
              alt="logout"
              src={imgs_select_pet_battle.img_select_battlet}
              width={200}
              className="h-auto" // This will set height to auto
            />
          </button>
        </>
      )}
    </div>
  );
};

export default ChoosePetBattle;
