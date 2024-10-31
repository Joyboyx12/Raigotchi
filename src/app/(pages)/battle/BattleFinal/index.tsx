"use client";
import { LoserModal } from "@/app/(pages)/battle/LoserModal";
import { VictoryModal } from "@/app/(pages)/battle/VictoryModal";
import imgs_decor from "@/assets/accessories/Decor";
import imgs_battle from "@/assets/battle-screen/Battle";
import imgs_pet_small from "@/assets/pet/PetSmall";
import { Spinner } from "@/components/ui/spinner";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { addressContracts, statusLabels } from "@/lib/utils";
import { useContract, useContractEvents } from "@thirdweb-dev/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const BattleFinal = () => {
  const { currentPet, currentPetFight } = useAppContext();

  const [attackInitiated, setAttackInitiated] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);

  const { contract: contractRaiGotchiAttack } = useContract(
    addressContracts.raiGotchiAttack
  );

  const {
    data: events,
    isLoading,
    error,
  } = useContractEvents(
    attackInitiated ? contractRaiGotchiAttack : null,
    "Attack"
  );

  const handleAttack = async () => {
    try {
      if (!contractRaiGotchiAttack) return;

      let attack = await contractRaiGotchiAttack.call("attack", [
        currentPet?._id,
        currentPetFight?._id,
      ]);

      console.log("🚀 ~ handleAttack ~ speciesCount:", attack);
      toast({
        title: "Attack",
        description: "Attack successfully",
      });
      setAttackInitiated(true);
    } catch (error) {
      console.log("🚀 ~ handleAttack ~ error:", error);
      toast({
        title: "Error",
        description: "You have one attack every 15 mins",
      });
    }
  };

  // if (events) {
  //   console.log(
  //     "🚀 ~ BattleFinal ~ events ưinner:",
  //     Number(events[0].data.winner)
  //   );
  //   console.log("🚀 ~ BattleFinal ~ events lỏe:", Number(events[0].data.loser));

  //   if (Number(events[0].data.winner === currentPet?._id)) {
  //     setIsWinner(true);
  //   } else {
  //     setIsLoser(true);
  //   }
  // }

  useEffect(() => {
    if (!events) return;

    console.log(
      "🚀 ~ BattleFinal ~ events ưinner:",
      Number(events[0].data.winner)
    );
    console.log("🚀 ~ BattleFinal ~ events lỏe:", Number(events[0].data.loser));

    if (Number(events[0].data.winner === currentPet?._id)) {
      setIsWinner(true);
    } else {
      setIsLoser(true);
    }
  }, [events]);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {isWinner && <VictoryModal />}

      {isLoser && <LoserModal />}
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
      {!currentPet && !currentPetFight ? (
        <div className="w-full h-full">
          <Spinner />
        </div>
      ) : (
        <>
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
                src={currentPet!._image}
                sizes="100%"
                fill
                objectFit="contain"
                style={{ transform: "scale(-1, 1)" }}
               
              />
            </div>
            <div className="relative w-[100px] h-[100px]">
              <Image
                alt="pet"
                src={currentPetFight!._image}
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
                  <p>{currentPet!._name || "PET NAME"}</p>
                  <div className="flex gap-4">
                    <p>ATK: {Number(currentPet!._attackPoints) || 0}</p>
                    <p>
                      STATUS:{" "}
                      {statusLabels[currentPet!._status] || "Unknown Status"}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>DEF: {Number(currentPet!._defensePoints) || 0}</p>
                    <p>SCORE: {Number(currentPet!._score) || 0}</p>
                  </div>
                </div>
                <div className="relative max-w-[100px] w-full h-[75px] ">
                  <Image
                    alt="pet"
                    src={currentPet!._image}
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
                    src={currentPetFight!._image}
                    sizes="100%"
                    fill
                    objectFit="contain"
                    style={{ transform: "scale(-1, 1)" }}
                  />
                </div>
                <div className="flex flex-col gap-1 font-bold text-4xl leading-5">
                  <p className="">{currentPetFight!._name || "PET NAME"}</p>
                  <div className="flex gap-4">
                    <p>ATK: {Number(currentPetFight!._attackPoints) || 0}</p>
                    <p>
                      STATUS:{" "}
                      {statusLabels[currentPetFight!._status] ||
                        "Unknown Status"}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>DEF: {Number(currentPetFight!._defensePoints) || 0}</p>
                    <p>SCORE: {Number(currentPetFight!._score) || 0}</p>
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
              <div className="w-full flex flex-col gap-1">
              <p className="font-bold text-4xl leading-5">
                {isLoading ? "Battle ..." : "Final"}
              </p>
              <p className="font-bold text-4xl leading-5">
                {isWinner && " Your win"}
                {isLoser && " Your lost"}
              </p>
              </div>

              <div className="h-full flex items-end justify-end">
                <button
                  onClick={() => {
                    handleAttack();
                    console.log("currentPet", currentPet);
                    console.log("currentPetFight", currentPetFight);
                  }}
                >
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
        </>
      )}
    </div>
  );
};

export default BattleFinal;
