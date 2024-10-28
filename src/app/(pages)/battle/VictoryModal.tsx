'use client'
import imgs_battle from "@/assets/battle-screen/Battle";
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

export function VictoryModal() {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] h-[400px] p-0 bg-transparent border-none"
      
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
          </DialogDescription>
        </DialogHeader>
        <div  className="flex w-full  h-[350px] bg-no-repeat"
        style={{
          backgroundSize: "100% 100%",
          objectFit: "fill",
          backgroundImage: `url('/Battle_Win.png')`,
        }}>
        
        </div>
        <div className="flex w-full items-center justify-center">
        <button
        onClick={() => setIsDialogOpen(false)}
        >
            <Image
              alt=""
              src={imgs_battle.img_ok_button}
              width={140}
              height={60}
            />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
