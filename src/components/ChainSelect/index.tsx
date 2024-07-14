'use client';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from '../react-daisyui';
import { useAccount, useConnect, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import classNames from 'classnames';
import { Chain } from 'viem';
import Image from 'next/image';
import { getChainLogo } from '@/utils/chain';

interface IChainSelectProps {
  expanded?: boolean
};

export const ChainSelect: React.FC<IChainSelectProps> = ({ expanded = true }) => {
  const [walletAddress, setWalletAdress] = useState<`0x${string}`>();
  const [selectedChain, setSelectedChain] = useState<Chain>();
  const { address, chain, isConnected } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  useEffect(() => {
    if (chain?.id) {
      setSelectedChain(chain);
    }
  }, [chain]);

  useEffect(() => {
    if (address) {
      setWalletAdress(address);
    }
  }, [address, setWalletAdress]);

  const onChainClick = (newChain: Chain) => {
    setSelectedChain(newChain);
    if (newChain) {
      switchChain({ chainId: newChain.id as any });
    }
  }
  return (
    <div>
      <Dropdown className="relative inline-block text-left rounded-md">
        <Dropdown.Toggle className="inline-flex w-full justify-center gap-x-1 rounded-full bg-opacity-30 text-white pl-2 pr-3 py-1.5 text-sm font-bold">
          {selectedChain ? (
            <div className='flex gap-1 items-center'>
              <Image className="rounded-full mr-1 h-7 w-7 text-gray-400" src={getChainLogo(selectedChain.id)} width={60} height={60} alt={selectedChain.name} />
            </div>
          ) : <span>Select Chain</span>}
          {expanded && selectedChain && (
            <span className='flex py-1 text-sm'>{selectedChain.name}</span>
          )}
          <i className="fas fa-chevron-down -mr-1 mt-1 text-gray-400" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="absolute right-0 p-2 z-10 mt-2 origin-top-right rounded-md bg-gray-900 border border-gray-400 border-opacity-20 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          {chains.map((chain) => (
            <div className="py-1" key={chain.id}>
              <Dropdown.Item
                onClick={() => onChainClick(chain)}
                className={classNames('text-gray-400 cursor-pointer flex px-2 py-2 pr-8 text-sm transition-all hover:text-gray-200 rounded-md')}
              >
                <Image className="rounded-full mr-1 h-7 w-7 text-gray-400" src={getChainLogo(chain.id)} width={60} height={60} alt={chain.name} />
                {chain.name}
                {chain.id === selectedChain?.id && (
                  <div className='flex-end'>
                    <i className="fas fa-check-circle text-green-400"></i>
                  </div>
                )}
              </Dropdown.Item>
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div >
  );
}