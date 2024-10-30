import LogoutButton from "@/app/(pages)/user-profile/LogoutButton";
import WalletAddressTab from "@/app/(pages)/user-profile/WalletAddressTab";
import imgs_user_infor from "@/assets/user-infor/Assets";
import UserLayout from "@/components/shared/UserLayout";
import Image from "next/image";
import React from "react";

const UserProfilePage = () => {



  return (

    <UserLayout>
       <>
      <div className="flex flex-col items-center gap-5 w-full h-full px-2 ">
        {/* wallet */}
       
<WalletAddressTab/>

{/* invite */}
        <div className="w-full flex gap-2">
          <div
            className="flex w-full h-[150px] bg-no-repeat py-5 px-6 gap-7 "
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/User_Screen_Invite_Tab.png')`,
            }}
          ></div>
          <div
            className="flex w-full h-[150px] bg-no-repeat py-5 px-6 gap-7 "
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/User_Screen_Invite_Tab.png')`,
            }}
          ></div>
        </div>

        <div
          className="flex w-full h-[150px] bg-no-repeat py-5 px-6 gap-7 flex-shrink-0 "
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/User_Screen_Wallet_Tab.png')`,
          }}
        ></div>
{/* logout */}

<LogoutButton/>
      
      </div>
      <div className="flex  flex-col gap-2 w-full h-[320px]  py-3 px-2 bg-[url('/Bottom_Frame.png')] bg-no-repeat bg-cover text-black font-bold text-4xl">
        <button className="flex items-center  gap-2">
          <Image
            alt="sound"
            src={imgs_user_infor.img_sound_button}
            width={50}
            height={50}
          />
          <p>Sound</p>
        </button>
        <button className="flex items-center  gap-2">
          <Image
            alt="tele"
            src={imgs_user_infor.img_tele_button}
            width={50}
            height={50}
          />

          <p>Telegram</p>
        </button>
        <button className="flex items-center  gap-2">
          <Image
            alt="mail"
            src={imgs_user_infor.img_mail_button}
            width={50}
            height={50}
          />

          <p>Feedbacks</p>
        </button>
        <button className="flex items-center  gap-2">
          <Image
            alt="docs"
            src={imgs_user_infor.img_docs_button}
            width={50}
            height={50}
          />
          <p>Docs</p>
        </button>
      </div>
    </>
    </UserLayout>
   
  );
};

export default UserProfilePage;
