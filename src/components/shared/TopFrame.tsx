import imgs_main_ui from '@/assets/main-ui'
import Image from 'next/image'
import React from 'react'

const TopFrame = () => {
  return (
    <div className="full h-[130px] bg-no-repeat" style={{
        backgroundSize: '100% 100%',
        objectFit:'fill',
        backgroundImage: `url('/Top_Frame.png')`,
      }}>
        
  </div>
  )
}

export default TopFrame