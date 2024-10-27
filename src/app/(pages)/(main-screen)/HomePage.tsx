"use client";

import ChoosePet from "@/app/(pages)/(main-screen)/ChoosePet";
import MainPet from "@/app/(pages)/(main-screen)/MainPet";
import React, { useState } from "react";

const HomePage = () => {
  const [isSwapPage, setIsSwapPage] = useState<boolean>(false);

  return <>{isSwapPage ? <ChoosePet /> : <MainPet  />}</>;
};

export default HomePage;
