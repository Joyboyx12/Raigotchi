'use client'
import BattleFinal from "@/app/(pages)/battle/BattleFinal";
import ChoosePetBattle from "@/app/(pages)/battle/ChoosePetBattle";
import SelectOpponentPage from "@/app/(pages)/battle/SelectOpponent";
import SelectFightPage from "@/app/(pages)/battle/SelectOpponent";
import { VictoryModal } from "@/app/(pages)/battle/VictoryModal";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_battle from "@/assets/battle-screen/Battle";
import imgs_pet_small from "@/assets/pet/PetSmall";
import MainLayout from "@/components/shared/MainLayout";
import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";
import React from "react";

const BattlePage = () => {

  const {step} = useAppContext()
  return (
    <MainLayout>

{step === 1 && < ChoosePetBattle />}
          {step === 2 && <SelectOpponentPage />}
          {step === 3 && <BattleFinal />}
  
    </MainLayout>
  );
};

export default BattlePage;
