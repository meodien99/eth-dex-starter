import React, { useEffect } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import { useReadContract } from 'wagmi';

interface IBalanceProps {
  address: `0x${string}`;
  selectedTokenAddress: `0x${string}`;
  balanceLoaded: (amount: string) => void;
}

export const Balance = ({ address, selectedTokenAddress, balanceLoaded }: IBalanceProps) => {
  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: selectedTokenAddress,
    functionName: 'balanceOf',
    args: [
      address
    ]
  });

  const { data: decimals } = useReadContract({
    abi: erc20Abi,
    address: selectedTokenAddress,
    functionName: 'decimals'
  })

  useEffect(() => {
    if (balance && decimals) {
      balanceLoaded(formatUnits(balance, decimals));
    }
  }, [balance, decimals, balanceLoaded]);

  return (
    <>
      {balance && decimals? (
        <span>{formatUnits(balance, decimals)}</span>
      ) : '0.00'}
    </>
  )
}