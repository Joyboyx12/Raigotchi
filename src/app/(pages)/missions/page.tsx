import MissionItem from "@/app/(pages)/missions/MissionItem";
import imgs_mission from "@/assets/missions-screen";
import imgs_pet_small from "@/assets/pet/PetSmall";
import React from "react";

const MissionsPage = () => {
  return (
    <>
      {/* Header */}

      <div className="w-full px-2">
        <div
          className="flex w-full h-[120px] bg-no-repeat py-5 px-6 gap-7 flex-shrink-0"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mission_Header.png')`,
          }}
        ></div>
      </div>

      <div
        className="w-full h-full flex flex-col  gap-3  overflow-y-scroll px-2   "
        style={{
          scrollbarWidth: "none",
        }}
      >
        <MissionItem
          title="Mint 4 times"
          time="3h 10m"
          missionIcon={imgs_mission.img_battle_icon}
          rewardIcon={imgs_mission.img_battle_icon}
        />

        <MissionItem
          title="Mint 4 times"
          time="3h 10m"
          missionIcon={imgs_mission.img_battle_icon}
          rewardIcon={imgs_mission.img_battle_icon}
        />
        <MissionItem
          title="Mint 4 times"
          time="3h 10m"
          missionIcon={imgs_mission.img_battle_icon}
          rewardIcon={imgs_mission.img_battle_icon}
        />
        <MissionItem
          title="Mint 4 times"
          time="3h 10m"
          missionIcon={imgs_mission.img_battle_icon}
          rewardIcon={imgs_mission.img_battle_icon}
        />
        <MissionItem
          title="Mint 4 times"
          time="3h 10m"
          missionIcon={imgs_mission.img_battle_icon}
          rewardIcon={imgs_mission.img_battle_icon}
        />
      </div>
    </>
  );
};

export default MissionsPage;
