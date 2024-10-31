'use client'
import { addressContracts } from '@/lib/utils';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import React from 'react'

const BalanceWallet = () => {
    const address = useAddress();
    const { contract } = useContract(addressContracts.token);
    console.log("🚀 ~ WalletAddressTab ~ contract:", contract);
  
    const { data: balance, isLoading: loadingBalance } = useContractRead(
      contract,
      "balanceOf", // The name of the function in your contract
      [address] // Arguments passed to the function
    );
  
    console.log("🚀 ~ WalletAddressTab ~ data:", balance);
  return (
    <div className="flex w-full items-center justify-between gap-2">
    <div
      className="flex w-full h-[50px] bg-no-repeat items-center justify-center "
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/User_Screen_Box.png')`,
      }}
    >
      <p className="text-4xl ">{balance ? Number(balance)/10 ** 18 : 0}</p>

    </div>
    <div
      className="flex w-full h-[50px] bg-no-repeat items-center justify-center "
      style={{
        backgroundSize: "100% 100%",
        objectFit: "fill",
        backgroundImage: `url('/User_Screen_Box.png')`,
      }}
    >
      <p className="text-4xl ">0.001</p>

    </div>
    </div>
  )
}

export default BalanceWallet