"use client";
import ItemPetMint from "@/app/(pages)/mint/ItemPetMint";
import PetViewMint from "@/app/(pages)/mint/PetViewMint";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_mint from "@/assets/mint-screen/Assets";
import imgs_pet_small from "@/assets/pet/PetSmall";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { addressContracts } from "@/lib/utils";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import "./styles.css";

export interface IPets {
  id: number;
  image: string;
  name: string;
  attackPoints: any;
  defensePoints: any;
  nextEvolutionLevel: any;
}

export interface IPetByOwner {
  _id: number;
  _image: string;
  _name: string;
  _status: any;
  _score: any;
  _level: any;
  _timeUntilStarving: any;
  _owner: any;
  _rewards: any;
  _genes: string;
}

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

const ChoosePetMint = () => {
  const address = useAddress();

  const { contract: contractGenePoll } = useContract(addressContracts.genePool);

  const { contract: contractToken } = useContract(addressContracts.token);

  const { contract: contractRaiGotchiV2 } = useContract(
    addressContracts.raiGotchiV2
  );

  const { toast } = useToast();

  const [currentPet, setCurrentPet] = React.useState<IPets | null>(null);

  const [speciesData, setSpeciesData] = useState<IPets[]>([]);
  const [petsByOwner, setPetsByOwner] = useState<IPetByOwner[]>([]);

  const handleGetSpeciesEvolutionPhaseInfo = async () => {
    if (!contractGenePoll) return;

    let speciesCount = await contractGenePoll.call("speciesCount");

    if (!speciesCount) return; // Add check for contract1

    const fetchedData: IPets[] = [];

    for (let i = 0; i < Number(speciesCount); i++) {
      try {
        const data = await contractGenePoll.call(
          "getSpeciesEvolutionPhaseInfo",
          [i, 0]
        );
        fetchedData.push(data as IPets);
      } catch (error) {
        console.error(`Error fetching data for species ${i}:`, error);
      }
    }

    setSpeciesData(fetchedData);
  };

  const handleGetInforByOwner = async () => {
    try {
      if (!contractRaiGotchiV2) return;

      let petsByOwner = await contractRaiGotchiV2.call("getPetsByOwner", [
        address,
      ]);
      console.log("🚀 ~ handleGetInforByOwner ~ address:", address);
      console.log("🚀 ~ handleGetInforByOwner ~ petsByOwner:", petsByOwner);

      if (!petsByOwner) return; // Add check for contract1

      const fetchedData: IPetByOwner[] = [];

      petsByOwner.forEach(async (element: any) => {
        const data = await contractRaiGotchiV2.call("getPetInfo", [
          Number(element),
        ]);
        const image = await contractRaiGotchiV2.call("getPetImage", [
          Number(element),
        ]);
       

        fetchedData.push({
          ...data,
          _id: Number(element),
          _image: image,
        });
      });
      console.log("🚀 ~ handleGetInforByOwner ~ fetchedData:", fetchedData);

      setPetsByOwner(fetchedData);
    } catch (error) {
      console.log("🚀 ~ handleGetInforByOwner ~ error:", error);
    }
  };

  const handleCheckMint = async () => {
    try {
      if (!contractGenePoll) return;

      let speciesMaxPopulation = await contractGenePoll.call(
        "speciesMaxPopulation",
        [currentPet?.id]
      );
      console.log(
        "🚀 ~ handleCheckMint ~ speciesMaxPopulation:",
        speciesMaxPopulation
      );
      let currentSpeciesPopulation = await contractGenePoll.call(
        "currentSpeciesPopulation",
        [currentPet?.id]
      );
      console.log(
        "🚀 ~ handleCheckMint ~ currentSpeciesPopulation:",
        currentSpeciesPopulation
      );

      if (!speciesMaxPopulation && !currentSpeciesPopulation) return;
      if (currentSpeciesPopulation >= speciesMaxPopulation) {
        alert("Max population reached!");
        return;
      }
      handleApprove();
      // alert(`Mint Success ${currentPet?.name}`)
    } catch (error) {
      console.log("🚀 ~ handleCheckMint ~ error:", error);
    }
  };

  const handleApprove = async () => {
    try {
      if (!contractToken) return;
      const spender = addressContracts.raiGotchiV2;
      const amountAllowance = await contractToken.call("allowance", [
        address,
        spender,
      ]);
      console.log("🚀 ~ handleApprove ~ amountAllowance:", amountAllowance);
      if (Number(amountAllowance) < 10) {
        const approve = await contractToken.call("approve", [
          spender,
          "10000000000000000000",
        ]);
        console.log("🚀 ~ handleApprove ~ approve:", approve);
        toast({
          title: "Approve",
          description: "Approve successfully",
        });
        handleMintPet();
      } else {
        handleMintPet();
      }
    } catch (error) {
      console.log("🚀 ~ handleApprove ~ error:", error);
    }
  };

  const handleMintPet = async () => {
    try {
      if (!contractRaiGotchiV2) return;
      const mint = await contractRaiGotchiV2.call("mint", [currentPet?.id]);
      console.log("🚀 ~ handleMintPet ~ mint:", mint);
      toast({
        title: "Mint Pet",
        description: "Mint pet successfully",
      });
      handleGetInforByOwner();
    } catch (error) {
      console.log("🚀 ~ handleMintPet ~ error:", error);
    }
  };

  useEffect(() => {
    if (contractGenePoll) {
      // Ensure contract1 is defined before calling
      handleGetSpeciesEvolutionPhaseInfo();
      handleGetInforByOwner();
    }
  }, [contractGenePoll]);
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full px-2">
      {speciesData.length <= 0 ? (
        <Spinner />
      ) : (
        <>
          <PetViewMint
            pets={speciesData && speciesData}
            setCurrentPet={setCurrentPet}
            currentPet={currentPet}
          />

          <div
            className="w-full h-[280px]  bg-no-repeat p-6"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Shop_Decorations_Menu.png')`,
            }}
          >
            <div className="w-full h-full grid grid-rows-2 grid-flow-col gap-2 overflow-x-auto custom-scrollbar">
              {petsByOwner.length <= 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                petsByOwner.map((pet, index) => (
                  <ItemPetMint
                    key={index}
                    img={pet._image || imgs_pet_small.img_base_small}
                  />
                ))
              )}
            </div>
          </div>
          <button onClick={handleCheckMint}>
            <Image
              alt="logout"
              src={imgs_mint.img_choose_pet_mint_button}
              width={200}
              className="h-auto" // This will set height to auto
            />
          </button>
        </>
      )}
    </div>
  );
};

export default ChoosePetMint;
