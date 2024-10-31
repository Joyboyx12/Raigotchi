"use client";
import PetFightItem from "@/app/(pages)/battle/SelectOpponent/PetFightItem";
import imgs_pvp_list from "@/assets/battle-screen/PVPList";
import imgs_pet_small from "@/assets/pet/PetSmall";
import { IPetByOwner, useAppContext } from "@/contexts/AppContext";
import { addressContracts } from "@/lib/utils";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Image from "next/image";
import React, { useState } from "react";

const SelectOpponentPage = () => {

  const address = useAddress();

  const { contract: contractRaiGotchiV2 } = useContract(
    addressContracts.raiGotchiV2
  );

  const [pets, setPets] = useState<IPetByOwner[]>([]);

  const handleGetListPetsFight = async () => {
    console.log("handleGetListPetsFight");
    if (!contractRaiGotchiV2) return;

    let petsCount = await contractRaiGotchiV2.call("_tokenIds");
    console.log("🚀 ~ handleGetListPetsFight ~ petsCount:", Number(petsCount));

    if (!petsCount) return;

    const fetchedData: IPetByOwner[] = [];

    for (let i = 0; i < Number(petsCount); i++) {
      try {
        const data = await contractRaiGotchiV2.call("getPetInfo", [i]);
        const image = await contractRaiGotchiV2.call("getPetImage", [i]);
        const attack = await contractRaiGotchiV2.call("getPetAttackPoints", [
          i,
        ]);
        const def = await contractRaiGotchiV2.call("getPetDefensePoints", [i]);

        if (data._owner !== address && data._status !== 4) {
          fetchedData.push({
            ...data,
            _id: i,
            _image: image,
            _attackPoints: attack,
            _defensePoints: def,
          });
        }
      } catch (error) {
        console.error(`Error fetching data for pet ${i}:`, error);
      }
    }
    console.log("🚀 ~ handleGetListPetsFight ~ fetchedData:", fetchedData);

    setPets(fetchedData);
  };

  React.useEffect(() => {
    if (contractRaiGotchiV2) {
      handleGetListPetsFight();
    }
  }, [contractRaiGotchiV2]);

  return (
    <>
      {/* Header */}
      <div className="w-full px-2">
        <div
          className="flex w-full h-[120px] bg-no-repeat py-5 px-6 gap-7 flex-shrink-0"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/PVP_List_Header.png')`,
          }}
        ></div>
      </div>
      <div
        className="w-full h-full flex flex-col gap-3 px-2 overflow-y-scroll"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {pets.length <= 0 ? (
          <div className="relative w-full h-[150px]">
            <Image
              alt="search"
              src={imgs_pvp_list.img_pvp_search_animation}
              fill
              sizes="100%"
            />
          </div>
        ) : (
          pets.map((pet, index) => (
            <PetFightItem
              key={index}
              pet={pet}
            />
          ))
        )}
      </div>
    </>
  );
};

export default SelectOpponentPage;
