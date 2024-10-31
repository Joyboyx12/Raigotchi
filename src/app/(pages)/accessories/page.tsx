

import PetViewAccessories from '@/app/(pages)/accessories/PetViewAccessories'
import { TabAccessories } from '@/app/(pages)/accessories/TabAccessories'
import MainLayout from '@/components/shared/MainLayout'
import React from 'react'

const AccessoriesPage = () => {
  return (
   <MainLayout>

<div className="w-full h-full flex flex-col gap-2">
    {/* Pet */}
    <PetViewAccessories />
    <div className='flex w-full flex-col px-2 gap-1'>

      {/* Tab */}
<TabAccessories/>
{/* Bottom */}

<div className="full h-[100px] bg-no-repeat" style={{
        backgroundSize: '100% 100%',
        objectFit:'fill',
        backgroundImage: `url('/Shop_Bottom_Tab.png')`,
      }}>
        
  </div>
    </div>


    </div>
   </MainLayout>
  )
}

export default AccessoriesPage