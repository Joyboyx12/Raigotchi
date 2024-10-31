"use client";

import { addressContracts } from "@/lib/utils";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { StaticImageData } from "next/image";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IPets {
  id: number;
  image: string | StaticImageData;
  name: string;
  attackPoints: any;
  defensePoints: any;
  nextEvolutionLevel: any;
}

export interface IPetByOwner {
  _id: number;
  _image: string | StaticImageData;
  _name: string;
  _status: any;
  _score: any;
  _level: any;
  _timeUntilStarving: any;
  _owner: any;
  _rewards: any;
  _genes: string;
  _attackPoints: any;
  _defensePoints: any;
}

const AppContext = createContext<{
  user: any | null;
  isSwapPage: boolean;
  currentPet: IPetByOwner | null;
  currentPetFight: IPetByOwner | null;

  petsByOwner: IPetByOwner[];
  speciesData: IPets[];
  currentPetSpecies: IPets | null;
  step: number;
  setCurrentPetSpecies: (currentPetSpecies: IPets) => void;
  setSpeciesData: (species: IPets[]) => void;
  setPetsByOwner: (petsByOwner: IPetByOwner[]) => void;
  setCurrentPet: (currentPet: IPetByOwner) => void;
  setCurrentPetFight: (currentPet: IPetByOwner) => void;

  setUser: (user: any | null) => void;
  setIsSwapPaged: (isSwap: boolean) => void;
  handleGetInforByOwner: () => void;
  nextStep: () => void;
  setStep:(step:number) =>void
}>({
  user: null,
  isSwapPage: false,
  currentPet: null,
  petsByOwner: [],
  speciesData: [],
  currentPetSpecies: null,
  step: 1,
  currentPetFight: null,
  setCurrentPetSpecies: () => {},
  setSpeciesData: () => {},
  setPetsByOwner: () => {},
  setCurrentPet: () => {},
  setCurrentPetFight: () => {},

  setUser: () => {},
  setIsSwapPaged: () => {},
  handleGetInforByOwner: () => {},
  nextStep: () => {},
  setStep: () => {},

});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

const AppProvider = ({
  children,
  initialAccessToken = "",
  user: userProp,
}: {
  children: React.ReactNode;
  initialAccessToken?: string;
  user?: any | null;
}) => {
  const [user, setUser] = useState<any | null>(userProp);
  const [isSwapPage, setIsSwapPaged] = useState<boolean>(false);

  //   useState(() => {
  //     if (typeof window !== "undefined") {
  //       clientAccessToken.value = initialAccessToken;
  //     }
  //   });

  const address = useAddress();

  const { contract: contractRaiGotchiV2 } = useContract(
    addressContracts.raiGotchiV2
  );
  const { contract: contractGenePoll } = useContract(addressContracts.genePool);

  const [currentPet, setCurrentPet] = React.useState<IPetByOwner | null>(null);
  const [currentPetFight, setCurrentPetFight] =
    React.useState<IPetByOwner | null>(null);

  const [petsByOwner, setPetsByOwner] = useState<IPetByOwner[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [currentPetSpecies, setCurrentPetSpecies] =
    React.useState<IPets | null>(null);

  const [speciesData, setSpeciesData] = React.useState<IPets[]>([]);

  const [step, setStep] = React.useState(1);

  function nextStep() {
    if (step === 3) return;
    setStep((prev) => prev + 1);
  }

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
      if (!contractRaiGotchiV2 || !address) return;

      const petsByOwnerIds = await contractRaiGotchiV2.call("getPetsByOwner", [
        address,
      ]);
      if (!petsByOwnerIds || petsByOwnerIds.length === 0) {
        setPetsByOwner([]);
        setLoading(false);
        return;
      }

      const fetchedData = await Promise.all(
        petsByOwnerIds.map(async (element: any) => {
          const data = await contractRaiGotchiV2.call("getPetInfo", [
            Number(element),
          ]);
          const image = await contractRaiGotchiV2.call("getPetImage", [
            Number(element),
          ]);
          const attack = await contractRaiGotchiV2.call("getPetAttackPoints", [
            Number(element),
          ]);
          const def = await contractRaiGotchiV2.call("getPetDefensePoints", [
            Number(element),
          ]);

          return {
            ...data,
            _id: Number(element),
            _image: image,
            _attackPoints: attack,
            _defensePoints: def,
          };
        })
      );

      setPetsByOwner(fetchedData);
    } catch (error) {
      console.log("🚀 ~ handleGetInforByOwner ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (contractRaiGotchiV2) {
      handleGetInforByOwner();
    }
  }, [contractRaiGotchiV2]);

  useEffect(() => {
    if (contractGenePoll) {
      // Ensure contract1 is defined before calling
      handleGetSpeciesEvolutionPhaseInfo();
    }
  }, [contractGenePoll]);

  return (
    <AppContext.Provider
      value={{
        currentPetFight,
        user,
        isSwapPage,
        currentPet,
        petsByOwner,
        currentPetSpecies,
        speciesData,
        step,
        setCurrentPetFight,
        nextStep,
        setStep,

        setCurrentPetSpecies,
        setSpeciesData,
        handleGetInforByOwner,
        setCurrentPet,
        setPetsByOwner,
        setUser,
        setIsSwapPaged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
