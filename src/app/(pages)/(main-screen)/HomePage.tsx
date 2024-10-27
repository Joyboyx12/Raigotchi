"use client";

import ChoosePet from "@/app/(pages)/(main-screen)/ChoosePet";
import MainPet from "@/app/(pages)/(main-screen)/MainPet";
import { useAppContext } from "@/contexts/AppContext";
import React, { useState } from "react";

const HomePage = () => {
  const {isSwapPage} = useAppContext()

  return <>{isSwapPage ? <ChoosePet /> : <MainPet  />}</>;
};

export default HomePage;
