import imgs_decor from "@/assets/accessories/Decor";
import Image from "next/image";
import React from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IPetByOwner, IPets } from "@/app/(pages)/mint/ChoosePetMint";

const PetView = ({
  pets,
  setCurrentPet,
}: {
  pets: IPetByOwner[];
  setCurrentPet: (pets: IPetByOwner) => void;
}) => {

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    if (!pets) {
      return;
    }

    let petCurrentData: IPetByOwner;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    petCurrentData = pets[api.selectedScrollSnap()]

    console.log("🚀 ~ React.useEffect ~ petCurrentData:", petCurrentData);

    setCurrentPet(petCurrentData);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      petCurrentData = pets[api.selectedScrollSnap()],
      console.log("🚀 ~ React.useEffect ~ petCurrentData:", petCurrentData);

      setCurrentPet(petCurrentData);
    });
  }, [api, pets, setCurrentPet]);

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
        <p className="font-bold text-4xl">TOD: 23h38m25s</p>
      </div>

      <div className="w-full h-full px-20">
        <Carousel
         setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {
              pets.map((pet, index)  => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-[200px] h-[200px]">
                    <Image
                      alt="pet"
                      src={pet._image}
                      sizes="100%"
                      fill
                      objectFit="contain"
                    />
                  </div>
                  <p className=" text-5xl">{pet._name ?? "Pet Name"}</p>
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
