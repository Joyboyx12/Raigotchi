import imgs_decor from "@/assets/accessories/Decor";
import Image from "next/image";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PetView = () => {
  return (
    <div
      className="w-full h-[300px] bg-no-repeat flex flex-col items-center justify-center text-white "
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/Pet_Background.png')`,
      }}
    >
      <div className="w-full flex justify-end px-6">
        <p className="font-bold text-xl">TOD: 23h38m25s</p>
      </div>

      <div className="w-full h-full px-20">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-[200px] h-[200px]">
                    <Image
                      alt="pet"
                      src={imgs_decor.glass_pet_idl}
                      sizes="100%"
                      fill
                      objectFit="contain"
                    />
                  </div>
                  <p className=" text-5xl">Pet Name</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default PetView;
