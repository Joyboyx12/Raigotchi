'use client'
import { addressContracts } from '@/lib/utils';
import { shortenIfAddress, useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import React from 'react'

const WalletAddressTab = () => {
    const address = useAddress();
    const { contract } = useContract(addressContracts.token);
    console.log("🚀 ~ WalletAddressTab ~ contract:", contract)


    const { data: balance, isLoading: loadingBalance } = useContractRead(
        contract,
        "balanceOf", // The name of the function in your contract
        [address] // Arguments passed to the function
      );

      console.log("🚀 ~ WalletAddressTab ~ data:", balance)

  return (
    <div
          className="flex flex-col w-full h-[150px] bg-no-repeat py-5 px-16 gap-7 flex-shrink-0 text-black"
          style={{
            backgroundSize: "100% 100%",
            objectFit: "fill",
            backgroundImage: `url('/User_Screen_Wallet_Address_Tab.png')`,
          }}
        >

            <div className='w-full flex  justify-between'>
                <p className='text-4xl'>Wallet address</p>
                <button className='text-4xl'>{balance ? Number(balance)/10 ** 18 : 0}</button>
            </div>
            <div className=''>
                <p className='text-4xl'>{address && shortenIfAddress(address, false) }</p>
                
            </div>
        </div>
  )
}

export default WalletAddressTab