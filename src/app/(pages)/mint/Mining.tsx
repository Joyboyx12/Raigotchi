import { MintConfirmModal } from '@/app/(pages)/mint/MintConfirmModal'
import imgs_decor from '@/assets/accessories/Decor'
import imgs_mint_ani from '@/assets/mint-animation'
import imgs_mint from '@/assets/mint-screen/Assets'
import imgs_mint_icon from '@/assets/mint-screen/Icons'
import Image from 'next/image'
import React from 'react'

const Mining = () => {
  return (
    <div
    className="w-full h-full  overflow-y-scroll flex flex-col gap-2"
    style={{
      scrollbarWidth: "none",
    }}
  >
    <div className="relative w-full h-[330px] flex-shrink-0">
      <Image
        alt="pet"
        src={imgs_mint_ani.img_mint_ufo}
        sizes="100%"
        fill
        objectFit="cover"
      />
    </div>

    <div className="px-2 flex flex-col gap-2">
      <div
        className="flex items-center justify-center w-full h-[120px]  bg-no-repeat  flex-shrink-0"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Mint_Coin_Tab.png')`,
        }}
      ></div>

      <div
        className="flex items-center justify-center w-full h-[200px]  bg-no-repeat  flex-shrink-0 px-5 "
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Mint_Big_Tab.png')`,
        }}
      >
        <div className="w-[70%] flex items-center justify-center">
          <div className="relative w-[200px] h-[200px]">
            <Image
              alt="pet"
              src={imgs_decor.glass_pet_idl}
              sizes="100%"
              fill
              objectFit="contain"
            />
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-8  items-end">
          <button>
            <Image
              alt=""
              src={imgs_mint.img_upgrade_button}
              width={150}
              height={60}
            />
          </button>

          {/* <button>
            <Image
              alt=""
              src={imgs_mint.img_buy_button}
              width={60}
              height={60}
            />
          </button> */}
    <MintConfirmModal/>

        </div>
      </div>

      <div className="w-full flex gap-4 px-2">
        <div
          className="w-full h-[50px]  bg-no-repeat  "
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SectionTab.png')`,
          }}
        ></div>
        <div
          className="w-full h-[50px]  bg-no-repeat  "
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SectionTab.png')`,
          }}
        ></div>
        <div
          className="w-full h-[50px]  bg-no-repeat  "
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SectionTab.png')`,
          }}
        ></div>
      </div>

      <div className="w-full flex gap-2">
        <div
          className="flex flex-col  w-[50%] h-[120px]  bg-no-repeat p-3"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SmallTab.png')`,
          }}
        >
          <Image
              alt=""
              src={imgs_mint_icon.img_icon_bc}
              width={50}
              height={50}
            />
        </div>
        <div
          className="flex flex-col w-[50%] h-[120px]  bg-no-repeat p-3"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SmallTab.png')`,
          }}
        >
           <Image
              alt=""
              src={imgs_mint_icon.img_icon_crypto}
              width={50}
              height={50}
            />
        </div>
      </div>

      <div className="w-full flex gap-2">
      <div
          className="flex flex-col w-[50%] h-[120px]  bg-no-repeat p-3"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SmallTab.png')`,
          }}
        >
           <Image
              alt=""
              src={imgs_mint_icon.img_icon_contract}
              width={50}
              height={50}
            />
        </div>
        <div
          className="flex flex-col w-[50%] h-[120px]  bg-no-repeat p-3"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SmallTab.png')`,
          }}
        >
           <Image
              alt=""
              src={imgs_mint_icon.img_icon_wallet}
              width={50}
              height={50}
            />
        </div>
      </div>

      <div className="w-full flex gap-2">
      <div
          className="flex flex-col w-[50%] h-[120px]  bg-no-repeat p-3"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SmallTab.png')`,
          }}
        >
           <Image
              alt=""
              src={imgs_mint_icon.img_icon_app}
              width={50}
              height={50}
            />
        </div>
        <div
          className="flex flex-col w-[50%] h-[120px]  bg-no-repeat p-3"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Mint_SmallTab.png')`,
          }}
        >
           <Image
              alt=""
              src={imgs_mint_icon.img_icon_ai}
              width={50}
              height={50}
            />
        </div>
      </div>


    </div>
  </div>
  )
}

export default Mining