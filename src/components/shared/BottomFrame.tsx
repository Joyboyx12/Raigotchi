"use client";
import imgs_main_ui from "@/assets/main-ui";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

const BottomFrame = () => {
  const { setIsSwapPaged } = useAppContext();
  const route = useRouter();
  return (
    <div className="flex flex-shrink-0 gap-2 w-full h-[120px]  py-3 px-2 bg-[url('/Bottom_Frame.png')] bg-no-repeat bg-cover ">
      <div className="w-[37.5%] h-full flex gap-2 py-3">
        <motion.div
          className="relative w-full h-full cursor-pointer"
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.5, yoyo: Infinity }}
        >
          <Image
            alt=""
            src={imgs_main_ui.img_bottom_pet_button}
            sizes="100%"
            fill
            objectFit="fill"
          />
        </motion.div>
        <motion.div
          className="relative w-full h-full  cursor-pointer"
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.5, yoyo: Infinity }}
        >
          <Image
            alt=""
            src={imgs_main_ui.img_bottom_mint_button}
            sizes="100%"
            fill
            objectFit="fill"
          />
        </motion.div>
      </div>

      <motion.button
        className="relative w-[25%] h-full  cursor-pointer"
        onClick={() => {
          route.push("/battle");
        }}
        whileHover={{
          scale: 1.05,
        }}
        transition={{ duration: 0.5, yoyo: Infinity }}
      >
        <Image
          alt=""
          src={imgs_main_ui.img_bottom_battle_button}
          sizes="100%"
          fill
          objectFit="fill"
        />
      </motion.button>

      <div className="w-[37.5%] h-full flex gap-2 py-3">
        <motion.button
          className="relative w-full h-full  cursor-pointer"
          onClick={() => {
            setIsSwapPaged(false);
            route.push("/");
          }}
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.5, yoyo: Infinity }}
        >
          <Image
            alt=""
            src={imgs_main_ui.img_bottom_home_button}
            sizes="100%"
            fill
            objectFit="fill"
          />
        </motion.button>

        <motion.div
          className="relative w-full h-full  cursor-pointer"
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.5, yoyo: Infinity }}
        >
          <Image
            alt=""
            src={imgs_main_ui.img_bottom_training_button}
            sizes="100%"
            fill
            objectFit="fill"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BottomFrame;
