import FormFaucet from '@/app/(pages)/faucet/FormFaucet'
import MainLayout from '@/components/shared/MainLayout'
import React from 'react'

const FaucetPage = () => {
  return (
    <MainLayout>
      <div className='w-full h-full flex items-center justify-center'>
      <FormFaucet/>
    </div>
    </MainLayout>
  )
}

export default FaucetPage