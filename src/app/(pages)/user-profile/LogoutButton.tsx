'use client'
import imgs_user_infor from '@/assets/user-infor/Assets'
import { useDisconnect } from '@thirdweb-dev/react'
import Image from 'next/image'
import React from 'react'



const LogoutButton = () => {

    const disconnect = useDisconnect() 
  return (
    <button
    onClick={disconnect}
    >
        
    <Image
      alt="logout"
      src={imgs_user_infor.img_logout_button}
      width={200}
      className="h-auto" // This will set height to auto
    />
  </button>
  )
}

export default LogoutButton