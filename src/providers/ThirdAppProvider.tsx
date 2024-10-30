"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AuroraTestnet } from "@thirdweb-dev/chains";
import * as React from "react";

export interface ThirdAppProps {
  children: React.ReactNode;
}

const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

export default function ThirdAppProvider({
  children,
}: Readonly<ThirdAppProps>) {
  return (
    <ThirdwebProvider clientId={clientId} activeChain={AuroraTestnet}>
      {children}
    </ThirdwebProvider>
  );
}
