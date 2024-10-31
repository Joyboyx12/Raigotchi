import ChoosePetBattle from "@/app/(pages)/battle/ChoosePetBattle";
import { VictoryModal } from "@/app/(pages)/battle/VictoryModal";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_battle from "@/assets/battle-screen/Battle";
import imgs_pet_small from "@/assets/pet/PetSmall";
import MainLayout from "@/components/shared/MainLayout";
import Image from "next/image";
import React from "react";

const BattlePage = () => {
  return (
    <MainLayout>
   <ChoosePetBattle/>
    </MainLayout>
  );
};

export default BattlePage;
