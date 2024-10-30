import ChoosePetMint from "@/app/(pages)/mint/ChoosePetMint";
import { MintConfirmModal } from "@/app/(pages)/mint/MintConfirmModal";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_mint_ani from "@/assets/mint-animation";
import imgs_mint from "@/assets/mint-screen/Assets";
import imgs_mint_icon from "@/assets/mint-screen/Icons";
import MainLayout from "@/components/shared/MainLayout";
import Image from "next/image";
import React from "react";

const MintPage = () => {
  return (
    <MainLayout>
      <ChoosePetMint/>
    </MainLayout>
  );
};

export default MintPage;
