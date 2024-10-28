import ButtonSwapPet from "@/app/(pages)/(main-screen)/ChoosePet/ButtonSwapPet";
import imgs_pet_small from "@/assets/pet/PetSmall";
import Image, { StaticImageData } from "next/image";
import React from "react";

const MissionItem = ({
  title,
  time,
  reward = "01",
  duarion= "10 mins",
  spaces ="4/10",
  craft="?",
  status="Active",
  missionIcon,
  rewardIcon
}: {
  title: string,
  time: string,
  reward?: string,
  duarion?: string,
  spaces?: string,
  craft?: string,
  status?: string,
  missionIcon: StaticImageData;
  rewardIcon: StaticImageData;

}) => {
  return (
    <div
      className="flex flex-col w-full h-[140px] bg-no-repeat py-4 px-4 sm:px-6  text-black"
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/Mission_Tab.png')`,
      }}
    >
   <div className="flex w-full gap-3">

   <div
        className="flex  items-center justify-center max-w-[40px] h-[40px] w-full bg-no-repeat"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Mission_Icon_Box.png')`,
        }}
      >
        <div className="relative max-w-[30px] w-full h-[30px]">
          <Image
            alt="pet"
            src={missionIcon}
            sizes="100%"
            fill
            objectFit="contain"
            
          />
        </div>
      </div>

      <div
        className="flex  items-center justify-between h-[40px] w-full bg-no-repeat text-4xl leading-3 px-4"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Mission_Box.png')`,
        }}
      >
       <p>{title}</p>
       <p>{time}</p>
      </div>
   </div>

   <div
        className="flex  items-center justify-between h-[20px] w-full  text-4xl gap-1 leading-3"
      
      >
       <p>Reward</p>
       <p>Duration</p>
       <p>Spaces</p>
       <p>Craft</p>
       <p>Status</p>

      </div>

   <div
        className="flex  items-center justify-between h-[40px] w-full bg-no-repeat flex-shrink-0 mt-2 text-4xl leading-3 px-1"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Mission_Box.png')`,
        }}
      >
    <div className="flex gap-1 items-center justify-center">
    <p>{reward}</p>
    <Image alt="icon" src={rewardIcon} width={20} height={20}/>
    
    </div>
       <p>{duarion}</p>
       <p>{spaces}</p>
       <p>{craft}</p>
       <p>{status}</p>
       
      </div>

      {/* <div className=" h-full w-full flex flex-col gap-2  ">
        <div className="flex items-center gap-7">
          <div
            className="flex  items-center justify-center max-w-[160px] h-[30px] w-full bg-no-repeat px-2"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Swap_Box_2.png')`,
            }}
          >
            <p className="w-full font-bold sm:text-xl">{name}</p>
          </div>

          <div
            className="flex  items-center justify-center max-w-[175px] h-[30px] w-full bg-no-repeat px-2"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Swap_Box_2.png')`,
            }}
          >
            <p className="w-full font-bold sm:text-xl">Status: {status}</p>
          </div>
        </div>

        <div className="flex gap-2 items-center  justify-between  ">
        <div
            className="flex gap-1 sm:gap-4 items-center max-w-[230px] h-[45px] w-full bg-no-repeat px-2 font-bold sm:text-2xl"
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/Swap_Box_4.png')`,
            }}
          >
          
            <p>Atk: {atk}</p>
            <p>Def: {def}</p>
          
          </div>
          
         
        </div>
      </div> */}
    </div>
  );
};

export default MissionItem;
