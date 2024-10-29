"use client";
import BottomFrame from "@/components/shared/BottomFrame";
import TopFrame from "@/components/shared/TopFrame";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export interface IUserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Readonly<IUserLayoutProps>) {
  const address = useAddress();
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center bg-black">
        {!address ? (
          <div className="max-w-screen-xs w-full h-full flex items-center justify-center bg-[url('/BG.png')] bg-no-repeat bg-cover bg-center">
            <ConnectWallet />
          </div>
        ) : (
          <div className="max-w-screen-xs w-full h-full bg-white flex flex-col justify-between bg-[url('/BG.png')] bg-no-repeat bg-cover bg-center gap-3 font-[family-name:var(--font-tiny-unicode)] text-white">
            <TopFrame />
            {children}
          </div>
        )}
      </div>
    </>
  );
}
