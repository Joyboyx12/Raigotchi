import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const statusLabels = ["HAPPY", "HUNGRY", "STARVING", "DYING", "DEAD"];


export const addressContracts = {
  uniswapV2Router02: "0x59e1dBcE58F3216627aE9E81d153EAD040FaCB3a",
  qrngContract: "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd",
  airnodeAddress: "0x6238772544f029ecaBfDED4300f13A3c4FE84E1D",
  endpointIdUint256: "0x94555f83f1addda23fdaa7c74f27ce2b764ed5cc430c66f5ff1bcf39d583da36",
  sponsorWallet: "0x30f07bD4cCbB1a5A1857CA7A40f6f3834Ede6f07",
  token: "0x5fD8bf700F9E38216c4e4B3cE6da8b9ceA53979D",
  raiGotchiTreasury: "0x6F53eFa30E2D7E4284C251D5de3fAdec21e40a0d",
  raiGotchiV2: "0xc99A39F07333b855871a8f387aB6Aec18392f71C",
  genePool: "0xac8c5886511848Cd2262730728f0f49B2b80A91e",
  raiGotchiFaucet: "0x937529264EBF13a0203cfAf7bBf09a3822f6636a",
  raiGotchiItems: "0x92a4C06bC74fa3f15356ac70CCA35dA1F7F613aB",
  raiGotchiAttack: "0x5c41D83Ad7C39bAe5D74866adb936049f44E5E30",
  raiGotchiBreed: "0xf92736D3D80A18d73a7197280C0B272EF236165B",
  raiGotchiImmidiateUseItems: "0xF827FcEFeF8aa2ce93B336032B19baCF728E5319",
  raiGotchiStakingAndMining: "0x0b63B2970D3253cA67DFfC4b25f910F041039B6a",
  raiGotchiAccessory: "0x41079DBdad3c952e62bac8C9dD9B4cC85A6b39f8",
  faucet: "0xf49dA53166Acb01adBbFF7d4c8EB14812Ff047ee"
}


