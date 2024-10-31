"use client";
import ButtonSwap from "@/app/(pages)/(main-screen)/MainPet/ButtonSwap";
import Item from "@/app/(pages)/(main-screen)/MainPet/Item";
import PetView from "@/app/(pages)/(main-screen)/MainPet/PetView";
import PriceItem from "@/app/(pages)/(main-screen)/MainPet/PriceItem";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_item from "@/assets/main-screen/Items";
import imgs_pet_small from "@/assets/pet/PetSmall";
import { Spinner } from "@/components/ui/spinner";
import { IPets, useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { addressContracts } from "@/lib/utils";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

export interface IItem {
  id: number;
  image: string | StaticImageData;
  name: string;
  price: string;
}

const ITEMS: IItem[] = [
  {
    id: 0,
    image: imgs_item.img_water,
    name: "Water",
    price: "5",
  },

  {
    id: 1,
    image: imgs_item.img_meat,
    name: "Beef",
    price: "5",
  },
  {
    id: 3,
    image: imgs_item.img_shield,
    name: "Shield",
    price: "5",
  },
  {
    id: 4,
    image: imgs_item.img_holy_water,
    name: "Holy Water",
    price: "5",
  },
];

const PETS: IPets[] = [
  {
    id: 0,
    image:
      "https://salmon-familiar-wildcat-904.mypinata.cloud/ipfs/QmegbpQmLkkLRaj21Rt3YhnJH53Wr1u54hKpnsnWvX2ziC",
    name: "Aqua Sprout",
    attackPoints: 10,
    defensePoints: 10,
    nextEvolutionLevel: 10,
  },
  {
    id: 1,
    image:
      "https://salmon-familiar-wildcat-904.mypinata.cloud/ipfs/QmetjXZu5ctSjpMwAaUkhtjgdCpKZkrySU6pXv81pCjwe4",
    name: "Ember Cub",
    attackPoints: 12,
    defensePoints: 8,
    nextEvolutionLevel: 10,
  },
];

const MainPet = () => {
  const { contract: contractToken } = useContract(addressContracts.token);

  const { contract: contractRaiGotchiImmidiateUseItems } = useContract(
    addressContracts.raiGotchiImmidiateUseItems
  );

  const address = useAddress();

 const {petsByOwner,setCurrentPet,currentPet, handleGetInforByOwner} = useAppContext()
 


  const handleApprove = async (IdItem: any) => {
    try {
      if (!contractToken) return;
      const spenderRaiGotchiImmidiateUseItems =
        addressContracts.raiGotchiImmidiateUseItems;
      const amountAllowance = await contractToken.call("allowance", [
        address,
        spenderRaiGotchiImmidiateUseItems,
      ]);
      console.log("🚀 ~ handleApprove ~ amountAllowance:", amountAllowance);
      if (Number(amountAllowance) < 10) {
        const approve = await contractToken.call("approve", [
          spenderRaiGotchiImmidiateUseItems,
          "10000000000000000000",
        ]);
        console.log("🚀 ~ handleApprove ~ approve:", approve);
        toast({
          title: "Approve",
          description: "Approve successfully",
        });

        handleBuyImidiateUseItem(IdItem);
      } else {
        handleBuyImidiateUseItem(IdItem);
      }
    } catch (error) {
      console.log("🚀 ~ handleApprove ~ error:", error);
    }
  };

  const handleBuyImidiateUseItem = async (IdItem: any) => {
    try {
      if (!contractRaiGotchiImmidiateUseItems) return;
      const buyItem = await contractRaiGotchiImmidiateUseItems.call(
        "buyImidiateUseItem",
        [currentPet?._id, IdItem]
      );
      console.log("🚀 ~ handle Buy ~ buy:", buyItem);
      toast({
        title: "Buy Item",
        description: "Buy item successfully",
      });
      handleConsumeItem(IdItem);
    } catch (error) {
      console.log("🚀 ~ handle Buy ~ error:", error);
    }
  };

  const handleConsumeItem = async (IdItem: any) => {
    try {
      if (!contractRaiGotchiImmidiateUseItems) return;
      const consumeItem = await contractRaiGotchiImmidiateUseItems.call(
        "consumeItem",
        [currentPet?._id, IdItem]
      );
      console.log("��� ~ handleConsume ~ consume:", consumeItem);
      toast({
        title: "Consume Item",
        description: "Consume item successfully",
      });
      handleGetInforByOwner();
    } catch (error) {
      console.log("��� ~ handleConsume ~ error:", error);
    }
  };

 


  return (
    <div className="w-full h-full flex flex-col gap-5 ">
      {petsByOwner.length <= 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Pet */}

          <PetView pets={petsByOwner} setCurrentPet={setCurrentPet} currentPet={currentPet} />
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
                    src={currentPet?._image || imgs_pet_small.img_rail_small}
                    sizes="100%"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>

              <div className="w-full text-white flex flex-col  font-bold text-xl sm:text-[40px] leading-7">
                <p className="">{currentPet?._name || "PET NAME"}</p>
                <div className="flex gap-5 ">
                  <p>ATK:  {Number(currentPet?._attackPoints) || "0"}</p>
                  <p>STATUS: {currentPet?._status || "HAPPY"}</p>
                </div>
                <div className="flex gap-5">
                  <p>DEF:  {Number(currentPet?._defensePoints) || "0"}</p>
                  <p>SCORE: {Number(currentPet?._score) || "0"}</p>
                </div>
              </div>

              <ButtonSwap />
            </div>
          </div>

          {/* Shop */}
          <div className="w-full px-2">
            <div
              className=" w-full h-[220px] bg-no-repeat px-3 py-8 sm:px-10 gap-2"
              style={{
                backgroundSize: "100% 100%",
                objectFit: "fill",
                backgroundImage: `url('/Shop_Tab.png')`,
              }}
            >
              <div className="flex gap-2 sm:gap-6">
                {ITEMS.map((item, index) => (
                  <Item
                    key={index}
                    item={item}
                    handleBuyImidiateUseItem={handleApprove}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  
  );
};

export default MainPet;
