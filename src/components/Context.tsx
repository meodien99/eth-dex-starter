'use client'
import React from 'react';
import { WagmiProvider } from "wagmi";
import { chainConfig } from "@/config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export const Context = ({ children }: any) => {
  return <WagmiProvider config={chainConfig}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </WagmiProvider>
}