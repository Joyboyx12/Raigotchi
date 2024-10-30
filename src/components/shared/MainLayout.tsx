"use client";
import BottomFrame from "@/components/shared/BottomFrame";
import TopFrame from "@/components/shared/TopFrame";
import { Toaster } from "@/components/ui/toaster";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<IMainLayoutProps>) {
  const address = useAddress();
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center bg-black">
        <Toaster />

        {!address ? (
          <div className="max-w-screen-xs w-full h-full flex items-center justify-center bg-[url('/BG.png')] bg-no-repeat bg-cover bg-center">
            <ConnectWallet />
          </div>
        ) : (
          <div className="max-w-screen-xs w-full h-full bg-white flex flex-col justify-between bg-[url('/BG.png')] bg-no-repeat bg-cover bg-center gap-3 font-[family-name:var(--font-tiny-unicode)] text-white">
            <TopFrame />
            {children}

            <BottomFrame />
          </div>
        )}
      </div>
    </>
  );
}
