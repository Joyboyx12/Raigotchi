import BalanceWallet from "@/app/(pages)/user-profile/BalanceWallet";
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
        <div className="flex flex-col items-center gap-5 w-full h-full px-2 text-black">
          {/* wallet */}

          <WalletAddressTab />

          {/* invite */}
          <div className="w-full flex gap-2">
            <div
              className="flex flex-col justify-between w-full h-[200px] bg-no-repeat p-6 "
              style={{
                backgroundSize: "100% 100%",
                objectFit: "fill",
                backgroundImage: `url('/User_Screen_Invite_Tab.png')`,
              }}
            >
              <div
                className="flex w-full h-[50px] bg-no-repeat items-center justify-center "
                style={{
                  backgroundSize: "100% 100%",
                  objectFit: "fill",
                  backgroundImage: `url('/User_Screen_Box.png')`,
                }}
              >
                <p className="text-4xl ">Invite Code</p>

              </div>
              <div
                className="flex w-full h-[50px] bg-no-repeat items-center justify-center gap-1 "
                style={{
                  backgroundSize: "100% 100%",
                  objectFit: "fill",
                  backgroundImage: `url('/User_Screen_Box.png')`,
                }}
              >
                                <p className="text-4xl ">Coming Soon</p>
                <Image alt="icon" src={imgs_user_infor.img_copy} width={18} height={18}/>



              </div>
            </div>
            <div
              className="flex flex-col justify-between w-full h-[200px] bg-no-repeat p-6 "
              style={{
                backgroundSize: "100% 100%",
                objectFit: "fill",
                backgroundImage: `url('/User_Screen_Invite_Tab.png')`,
              }}
            >
                 <div
                className="flex w-full h-[50px] bg-no-repeat items-center justify-center "
                style={{
                  backgroundSize: "100% 100%",
                  objectFit: "fill",
                  backgroundImage: `url('/User_Screen_Box.png')`,
                }}
              >
                <p className="text-4xl ">Referrals</p>

              </div>
              <div
                className="flex w-full h-[50px] bg-no-repeat items-center justify-center "
                style={{
                  backgroundSize: "100% 100%",
                  objectFit: "fill",
                  backgroundImage: `url('/User_Screen_Box.png')`,
                }}
              >
                <p className="text-4xl ">Coming Soon</p>

              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-end gap-3 w-full h-[160px] bg-no-repeat py-5 px-6 flex-shrink-0 "
            style={{
              backgroundSize: "100% 100%",
              objectFit: "fill",
              backgroundImage: `url('/User_Screen_Wallet_Tab.png')`,
            }}
          >
<div
                className="flex gap-2 w-full h-[50px] bg-no-repeat items-center justify-center "
                style={{
                  backgroundSize: "100% 100%",
                  objectFit: "fill",
                  backgroundImage: `url('/User_Screen_Box.png')`,
                }}
              >
                <Image alt="icon" src={imgs_user_infor.img_wallet} width={18} height={18}/>

                 <p className="text-4xl ">Balance</p>


              </div>

           <BalanceWallet/>

          </div>
          {/* logout */}

          <LogoutButton />
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
