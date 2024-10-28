'use client'
import imgs_battle from "@/assets/battle-screen/Battle";
import imgs_mint from "@/assets/mint-screen/Assets";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { useState } from "react";

export function MintConfirmModal() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <DialogTrigger asChild>
      <button>
              <Image
                alt=""
                src={imgs_mint.img_buy_button}
                width={60}
                height={60}
              />
            </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[250px]  p-0 bg-transparent border-none shadow-none"
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/Mint_Confirm_Menu.png')`,
      }}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
          </DialogDescription>
        </DialogHeader>
       
        <div className="flex w-full items-center justify-center gap-10 ">
        <button
        onClick={() => setIsDialogOpen(false)}
        >
            <Image
              alt=""
              src={imgs_mint.img_yes_button}
              width={80}
              height={80}
            />
          </button>
          <button
        onClick={() => setIsDialogOpen(false)}
        >
            <Image
              alt=""
              src={imgs_mint.img_no_button}
              width={80}
              height={80}
            />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
