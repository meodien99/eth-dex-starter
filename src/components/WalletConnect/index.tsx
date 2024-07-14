'use client';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { ConnectedWallet } from './ConnectedWallet';
import { Button } from '@/components/react-daisyui';
import { useReconnect } from 'wagmi';

export const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const {reconnect} = useReconnect();

  
  const onConnect = () => {
    connect({
      connector: injected()
    });
  }

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(undefined);
    }
  }, [address, setWalletAddress, isConnected]);

  useEffect(() => {
    reconnect()
  }, [])
  
  return (
    <div>
    {walletAddress && (
      <ConnectedWallet />
    )}
    {!walletAddress && (
      <Button className="rounded-lg bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 border-green-500" onClick={() => onConnect()}>
        Connect Wallet
      </Button>
    )}
  </div>
  )
}