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
      <div className="w-full h-full flex flex-col gap-2">
        <VictoryModal/>
      {/* Header */}

      <div className="w-full  h-[120px] px-1">
        <div
          className="flex w-full h-full  bg-no-repeat py-5 px-6 gap-7 flex-shrink-0"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Battle_Header.png')`,
          }}
        ></div>
      </div>

      {/* Pet Battle */}

      <div
        className="w-full h-[250px] bg-no-repeat flex  items-center justify-between text-white px-10 sm:px-20"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Battle_BG.png')`,
        }}
      >
        <div className="relative w-[100px] h-[100px]">
          <Image
            alt="pet"
            src={imgs_decor.glass_pet_idl}
            sizes="100%"
            fill
            objectFit="contain"
          />
        </div>
        <div className="relative w-[100px] h-[100px]">
          <Image
            alt="pet"
            src={imgs_decor.glass_pet_idl}
            sizes="100%"
            fill
            objectFit="contain"
          />
        </div>
      </div>

      {/* Battle pet infor */}
      <div className="w-full px-2">
        <div
          className="flex flex-col justify-between w-full h-[250px]  bg-no-repeat py-6 px-6  flex-shrink-0"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Battle_Pet_Infor.png')`,
          }}
        >
          <div className="w-full flex items-center justify-between pl-5 text-4xl leading-5 ">
            <div className="flex flex-col gap-1 font-bold">
              <p>RAI</p>
              <div className="flex gap-4">
                <p>ATK: 100</p>
                <p>STATUS: HAPPY</p>
              </div>
              <div className="flex gap-4">
                <p>DEF: 100</p>
                <p>SCORE: 0</p>
              </div>
            </div>
            <div className="relative max-w-[100px] w-full h-[75px] ">
              <Image
                alt="pet"
                src={imgs_pet_small.img_rail_small}
                sizes="100%"
                fill
                objectFit="contain"
              />
            </div>
          </div>

          <div className="w-full flex  gap-10 ">
            <div className="relative max-w-[100px] w-full h-[75px] ">
              <Image
                alt="pet"
                src={imgs_pet_small.img_rail_small}
                sizes="100%"
                fill
                objectFit="contain"
                style={{ transform: "scale(-1, 1)" }}
              />
            </div>
            <div className="flex flex-col gap-1 font-bold text-4xl leading-5">
              <p className="">RAI</p>
              <div className="flex gap-4">
                <p>ATK: 100</p>
                <p>STATUS: HAPPY</p>
              </div>
              <div className="flex gap-4">
                <p>DEF: 100</p>
                <p>SCORE: 0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log */}

      <div className="w-full px-2">
        <div
          className="flex  justify-between w-full h-[100px] bg-no-repeat pl-5 pr-7 py-4"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Battle_Log_Tab.png')`,
          }}
        >
          <p className="font-bold text-4xl leading-5">sadajsdhajksdhajk</p>

        <div className="h-full flex items-end justify-end">
        <button>
            <Image
              alt=""
              src={imgs_battle.img_down_arrow}
              width={30}
              height={30}
            />
          </button>
        </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default BattlePage;
