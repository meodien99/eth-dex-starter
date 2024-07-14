'use client';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from '@/components/react-daisyui';
import { useAccount, useBalance, useEnsName } from 'wagmi';
import { formatAddress, formatEthDecimals, getAddressFromSymbol } from '@/utils/chain';
import { disconnect } from '@wagmi/core';
import { chainConfig } from '@/config';
import { getPrice } from '@/app/services';
import { formatUsd } from '@/utils/number';

export const ConnectedWallet = () => {
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const [USDEquivalent, setUSDEquivalent] = useState<string>();

  const { address, chain } = useAccount();
  const { data: ensName } = useEnsName();
  const { data: balance } = useBalance({
    address
  });

  const getPriceData = async (strAmount: string) => {
    if (address && chain) {
      const amount = BigNumber(strAmount);
      const ethContractAddress = getAddressFromSymbol('WETH');

      const response = await getPrice(ethContractAddress);

      if (response?.usdPrice && response?.usdPriceFormatted) {
        const { usdPrice } = response;
        const balance = amount.multipliedBy(usdPrice);

        setUSDEquivalent(formatUsd(balance.toNumber()));
      }
    }
  }

  const onDisconnect = async () => {
    await disconnect(chainConfig)
  }

  useEffect(() => {
    if (balance) {
      getPriceData(balance.formatted)
    }
  }, [balance]);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address, setWalletAddress]);

  return (
    <div>
      <Dropdown className="relative inline-block text-left rounded-md">
        <Dropdown.Toggle className="inline-flex w-full justify-center gap-x-1.5 rounded-fullbg-opacity-30 text-white pl-2 pr-3 py-1.5 text-sm font-bold ">
          {ensName && (
            <span>{ensName}</span>
          )}
          {!ensName && (
            <span>{formatAddress(walletAddress)}</span>
          )}
          <i className="fas fa-chevron-down -mr-1 mt1 text-gray-400 text-md"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="absolute right-0 p-2 z-10 mt-1 origin-top-right rounded-md bg-gray-900 border border-gray-400 border-opacity-20 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 pt-1 pb-3 border-b-slate-700 border-b border-solid">
            <div className="truncate text-sm font-medium text-white">
              <div className="flex flex-col gap-2 justify-center items-center">
                {balance && (
                  <p className="text-xxl font-medium whitespace-nowrap">{formatEthDecimals(balance?.formatted)} <span className='uppercase'>{balance?.symbol}</span></p>
                )}
                {USDEquivalent && (
                  <p className="font-medium text-slate-400">~{USDEquivalent}</p>
                )}
              </div>
            </div>
          </div>
          <Dropdown.Item>
            <Button
              color='ghost'
              onClick={onDisconnect}
              className={classNames('text-gray-400 cursor-pointer flex py-2 text-sm transition-all hover:text-gray-200 rounded-md')}
            >
              <div className='flex items-center gap-1'>
                <i className="fas fa-sign-out-alt"/>
                <span>Disconnect</span>
              </div>
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}