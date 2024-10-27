'use client'
import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import imgs_pet_select from '@/assets/main-screen/pet-select-screen';

const ButtonSwapPet = () => {
  return (
    <motion.button className="  "
    whileHover={{
     scale: 1.05,
   }}
   transition={{ duration: 0.5, yoyo: Infinity }}
   >
    
       <Image alt="swap" src={imgs_pet_select.img_pet_swap_button} width={120} height={100}/>
    
   </motion.button>
  )
}

export default ButtonSwapPet