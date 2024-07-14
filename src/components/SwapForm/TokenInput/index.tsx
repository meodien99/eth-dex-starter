'use client';
import { Balance } from '@/components/Balance';
import React, { useCallback, useState } from 'react';
import { Input } from '@/components/react-daisyui';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { TokenSelect } from '../TokenSelect';
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { useReadContract } from 'wagmi';

export type InputType = 'input' | 'output';

interface ITokenInputProps {
  symbol: string | undefined;
  logo: string | undefined;
  amount: string;
  onChange: (value: string, inputType?: InputType) => void;
  selectedTokenAddress: `0x${string}` | undefined;
  placedBottom?: boolean;
  openModal: (inputType: InputType | undefined) => void;
  inputType?: InputType; // should be neither 'input' nor 'output'
  price: string;
}

export const TokenInput: React.FC<ITokenInputProps> = ({ inputType, price, amount, onChange, selectedTokenAddress, symbol, logo, placedBottom, openModal }) => {
  const [maxAmount, setMaxAmount] = useState<string>('0.0');
  const { data: decimals } = useReadContract({
    abi: erc20Abi,
    address: selectedTokenAddress,
    functionName: 'decimals'
  })

  const { address } = useAccount();

  const onBalanceLoaded = useCallback((amount: string) => {
    if (amount) {
      setMaxAmount(amount);
    }
  }, []);

  const onMaxBtnClick = () => {
    onChange(maxAmount);
  }

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.target.checkValidity()) {
      const value = e.target.value;
      onChange(value);
    }
  }, [onChange]);

  const onSelectBtnClick = useCallback(() => {
    openModal(inputType)
  }, [openModal, inputType]);

  const balanceContainer = (
    <div className={classNames('flex justify-between', placedBottom ? 'mt-5' : 'mb-4')}>
      <div className='flex items-center text-sm text-gray-400 gap-1'>
        <i className="fas fa-wallet"></i>
        <div>Balance: {selectedTokenAddress && address ? (
          <Balance balanceLoaded={onBalanceLoaded} selectedTokenAddress={selectedTokenAddress} address={address} />
        ) : '--'}
        </div>
      </div>
      <button onClick={onMaxBtnClick} className='rounded-full text-xs px-2 py-0 text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white'>MAX</button>
    </div>
  );

  const priceContainer = !!price && (
    <div className="absolute left-0 -bottom-5 text-xs text-gray-300 opacity-40">
      ${decimals ? formatUnits(parseUnits(price, decimals), decimals) : 0}
    </div>
  );

  return (
    <div className='token-input-component'>
      {!placedBottom && balanceContainer}
      <div className='relative'>
        {!placedBottom && priceContainer}
        <label htmlFor="tokenInput" className="sr-only">
          0
        </label>
        <Input
          size='lg'
          value={amount}
          onChange={onInputChange}
          pattern="[0-9]+[.]?[0-9]*"
          className="pb-12 block text-4xl w-full rounded-md border-0 py-4 text-white bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
          placeholder="0"
        />
        <TokenSelect symbol={symbol} logo={logo} onClick={onSelectBtnClick} />
        {placedBottom && priceContainer}
      </div>
      {placedBottom && balanceContainer}
    </div>
  )
}