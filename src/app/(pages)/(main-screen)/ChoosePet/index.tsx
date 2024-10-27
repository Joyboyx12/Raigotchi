import PetItem from '@/app/(pages)/(main-screen)/ChoosePet/PetItem'
import imgs_pet_small from '@/assets/pet/PetSmall'
import React from 'react'

const ChoosePet = () => {
  return (
    <>
      {/* Header */}
       
      <div
          className="flex w-full h-[120px] bg-no-repeat py-5 px-6 gap-7 flex-shrink-0"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/Pet_swap_Header.png')`,
          }}
        >
      </div >
      <div className="w-full h-full flex flex-col  gap-3 px-2  overflow-y-scroll " style={{
            scrollbarWidth:'none'
          }}>
      
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>
<PetItem name='Pet name' status='Happy' img={imgs_pet_small.img_rail_small} atk={100} def={100}/>

    </div>
    </>
    
  )
}

export default ChoosePet