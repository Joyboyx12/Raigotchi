"use client";
import { IPets } from "@/app/(pages)/mint/ChoosePetMint";
import imgs_decor from "@/assets/accessories/Decor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useState } from "react";

const PetViewMint = ({
  pets,
  currentPet,
  setCurrentPet,
}: {
  pets: IPets[];
  currentPet: IPets | null;
  setCurrentPet: (pets: IPets) => void;
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    if (!pets) {
      return;
    }

    let petCurrentData: IPets;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    petCurrentData = {
      ...pets[api.selectedScrollSnap()],
      id: api.selectedScrollSnap(), // Set id to the selected index
    };
    console.log("🚀 ~ React.useEffect ~ petCurrentData:", petCurrentData);

    setCurrentPet(petCurrentData);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      petCurrentData = {
        ...pets[api.selectedScrollSnap()],
        id: api.selectedScrollSnap(), // Set id to the selected index
      };
      console.log("🚀 ~ React.useEffect ~ petCurrentData:", petCurrentData);

      setCurrentPet(petCurrentData);
    });
  }, [api, pets]);

  return (
    <div
      className="w-full h-[350px] bg-no-repeat flex flex-col items-center justify-center text-white "
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/Mint_Menu_Choose_Pet_Tab.png')`,
      }}
    >
      <div className="w-full h-full px-20">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {pets &&
              pets.map((pet, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-[170px] h-[170px]">
                      <Image
                        alt="pet"
                        src={pet.image ?? imgs_decor.glass_pet_idl}
                        sizes="100%"
                        fill
                        objectFit="contain"
                      />
                    </div>
                    <p className=" text-4xl">{pet.name ?? "Pet Name"}</p>
                    <div
                      className="w-full h-[120px] bg-no-repeat flex flex-col items-center justify-center text-white px-10 text-4xl leading-8"
                      style={{
                        backgroundSize: "100% 100%",
                        objectFit: "fill",
                        backgroundImage: `url('/Mint_Menu_Choose_Pet_Stats_Tab.png')`,
                      }}
                    >
                      <div className="w-full flex items-center justify-between">
                        <p>Atk: {Number(pet.attackPoints)}</p> <p>Text</p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <p>Def: {Number(pet.defensePoints)}</p> <p>Text</p>
                      </div>
                      <div className="w-full flex">
                        {" "}
                        <p>Text</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="mx-20" />
          <CarouselNext className="mx-20" />
        </Carousel>
      </div>
      <p className="text-4xl">{currentPet && currentPet.name}</p>
    </div>
  );
};

export default PetViewMint;
