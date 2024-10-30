"use client";
import ItemPetMint from "@/app/(pages)/mint/ItemPetMint";
import PetViewMint from "@/app/(pages)/mint/PetViewMint";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_mint from "@/assets/mint-screen/Assets";
import imgs_pet_small from "@/assets/pet/PetSmall";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

export interface IPets {
  id: number;
  image: string;
  name: string;
  attackPoints: any;
  defensePoints: any;
  nextEvolutionLevel: any;
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

  const { contract } = useContract(
    "0xB76dA29352313F63cCac626e909FfeA184090De8"
  );

  const { contract: contractToken } = useContract(
    "0x88858f9f3ed8950Bd190964483Eb4d19D1223c11"
  );

  const { contract: contractRaiGotchiV2 } = useContract(
    "0x20A510B6CfC6Df6151C3b41F5897E31E054a92f4"
  );

  const { toast } = useToast()

  const [currentPet, setCurrentPet] = React.useState<IPets | null>(null);

 
  const [speciesData, setSpeciesData] = useState<IPets[]>([]);

  const handleGetSpeciesEvolutionPhaseInfo = async () => {
    if (!contract) return;

    let speciesCount = await contract.call("speciesCount");
    console.log(
      "🚀 ~ handleGetSpeciesEvolutionPhaseInfo ~ speciesCount:",
      speciesCount
    );

    if (!speciesCount) return; // Add check for contract1

    const fetchedData: IPets[] = [];

    for (let i = 0; i < Number(speciesCount); i++) {
      try {
        const data = await contract.call("getSpeciesEvolutionPhaseInfo", [
          i,
          0,
        ]);
        console.log("🚀 ~ handleGetSpeciesEvolutionPhaseInfo ~ data:", data);
        fetchedData.push(data as IPets);
      } catch (error) {
        console.error(`Error fetching data for species ${i}:`, error);
      }
    }

    setSpeciesData(fetchedData);
  };

  const handleCheckMint = async () => {
    try {
      if (!contract) return;

      let speciesMaxPopulation = await contract.call("speciesMaxPopulation", [
        currentPet?.id,
      ]);
      let currentSpeciesPopulation = await contract.call(
        "currentSpeciesPopulation",
        [currentPet?.id]
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
      const spender = "0x20A510B6CfC6Df6151C3b41F5897E31E054a92f4";
      const amountAllowance = await contractToken.call("allowance", [
        address,
        spender,
      ]);
      console.log("🚀 ~ handleApprove ~ amountAllowance:", amountAllowance);
      if (Number(amountAllowance) <= 0) {
        const approve = await contractToken.call("approve", [
          spender,
          "10000000000000000000",
        ]);
        console.log("🚀 ~ handleApprove ~ approve:", approve);
        toast({
          title: "Approve",
          description: "Approve successfully",
        })
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
      })
    } catch (error) {
      console.log("🚀 ~ handleMintPet ~ error:", error);
    }
  };

  useEffect(() => {
    if (contract) {
      // Ensure contract1 is defined before calling
      handleGetSpeciesEvolutionPhaseInfo();
    }
  }, [contract]);
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
            className="w-full h-[280px] bg-no-repeat px-6 py-7"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Shop_Decorations_Menu.png')`,
            }}
          >
            <ItemPetMint img={imgs_pet_small.img_base_small} />
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
