'use client'
import imgs_main_screen from "@/assets/main-screen";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import Image from "next/image";

import React from 'react'

const ButtonSwap = () => {
  const {setIsSwapPaged} = useAppContext()

  return (
   <div className="h-full flex items-end  py-2">
 <motion.button className=" w-[40px] h-[40px] "
 onClick={() => {
  console.log("OnCllick")
setIsSwapPaged(true)
 }}
    whileHover={{
     scale: 1.05,
   }}
   transition={{ duration: 0.5, yoyo: Infinity }}
   >
    
       <Image alt="swap" src={imgs_main_screen.img_swap_button} width={40} height={40}/>
    
   </motion.button>

   </div>
  )
}

export default ButtonSwap