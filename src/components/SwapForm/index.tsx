'use client';

import { InputType, TokenInput } from "./TokenInput";
import { Button } from '@/components/react-daisyui';
import { IToken, ITokenSwap } from '@/app/types/TokenSwap.type';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { TokenModal } from './TokenModal';
import { tokens as defaultTokens } from '@/data/tokens';
import { getPricesRatio } from '@/app/services';
import { SwapButton } from "./SwapButton";
// import { SwapButton } from "./SwapButton";

export const SwapForm = () => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const [isModalOpen, setModalOpen] = useState<boolean | undefined>(false);
  const [tokens, setTokens] = useState<IToken[]>(defaultTokens);
  const [inputToken, setInputToken] = useState<IToken | undefined>();
  const [inputTokenPrice, setInputTokenPrice] = useState<string>('');
  const [outputToken, setOutputToken] = useState<IToken | undefined>();
  const [outputTokenPrice, setOutputTokenPrice] = useState<string>('');
  const [inAmount, setInAmount] = useState('');
  const [outAmount, setOutAmount] = useState('');
  const [currentInputType, setCurrentInputType] = useState<InputType | undefined>(undefined);
  const [pricesRatio, setPricesRatio] = useState<number | undefined>(undefined);

  const onOpenModal = useCallback((inputType?: InputType) => {
    setModalOpen(true);
    setCurrentInputType(inputType);
  }, [setCurrentInputType, setModalOpen])

  const onCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const onTokenSelected = (token: ITokenSwap) => {
    setModalOpen(false);
    setTokens(tokens.map((t) => ({
      ...t,
      selected: t.symbol === token.symbol
    })));

    if (currentInputType == 'input') {
      setInputToken(token);
      // update prices ratio here instead of calling request inside useEffect function in order to reduce the calls.
      !!outputToken && fetchPrices(token.address, outputToken.address);
    } else {
      setOutputToken(token);
      // update prices ratio here instead of calling request inside useEffect function in order to reduce the calls.
      !!inputToken && fetchPrices(inputToken.address, token.address);
    }
  };

  const onInputAmountChange = useCallback((value: string) => {
    setInAmount(value);
    if (pricesRatio) {
      setOutAmount((Number(value) * pricesRatio).toFixed(8))
    }
  }, [pricesRatio, setInAmount, setOutAmount]);

  const onOutputAmountChange = useCallback((value: string) => {
    setOutAmount(value);
    if (pricesRatio) {
      setInAmount((Number(value) * 1 / pricesRatio).toFixed(8))
    }
  }, [pricesRatio, setInAmount, setOutAmount]);

  const onSwapToken = () => {
    const tokenOne = inputToken;
    const tokenTwo = outputToken;

    setInputToken(tokenTwo);
    setOutputToken(tokenOne);

    setInAmount(outAmount);
    setOutAmount(inAmount);

    setInputTokenPrice(outputTokenPrice);
    setOutputTokenPrice(inputTokenPrice);
  }

  const fetchPrices = async (address1: string, address2: string) => {
    const { ratio, tokenOnePriceFormatted, tokenTwoPriceFormatted } = await getPricesRatio(address1, address2);

    setPricesRatio(ratio);
    setInputTokenPrice(tokenOnePriceFormatted);
    setOutputTokenPrice(tokenTwoPriceFormatted);

    if(inAmount) {
      setOutAmount((Number(inAmount) * ratio).toFixed(8))
    }
  };

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address, setWalletAddress]);

  const selectedTokens = useMemo(() => [inputToken, outputToken], [inputToken, outputToken]);

  const isSwapEnabled = !!walletAddress && !!inputToken && !!outputToken && !!inAmount && !!outAmount;

  return (
    <div className="token-swap-wrapper rounded-lg bg-gray-800 border border-solid border-gray-700 px-4 py-5 sm:px-6 w-full">
      <h3 className="text-xl font-semibold leading-6 text-white mb-4">Swap</h3>
      <div className="mb-5 relative">
        <TokenInput price={inputTokenPrice} inputType='input' amount={inAmount} onChange={onInputAmountChange} selectedTokenAddress={inputToken?.address} symbol={inputToken?.symbol} logo={inputToken?.logo} openModal={onOpenModal} />
      </div>

      <div className="switch-btn m-auto flex align-middle justify-center py-2">
        <Button className="bg-gray-700 border-gray-600 hover:bg-gray-800 rounded-md p-4" onClick={onSwapToken}>
          <i className="fa fa-arrow-down text-gray-300"></i>
        </Button>
      </div>
      <div className="my-5 relative">
        <TokenInput price={outputTokenPrice} inputType='output' amount={outAmount} onChange={onOutputAmountChange} placedBottom={true} selectedTokenAddress={outputToken?.address} symbol={outputToken?.symbol} logo={outputToken?.logo} openModal={onOpenModal} />
      </div>
      <SwapButton inputAddress={inputToken?.address} outputAddress={outputToken?.address} walletAddress={address} enabled={isSwapEnabled} value={inAmount}/>
      {isModalOpen && (
        <TokenModal tokens={tokens} open={isModalOpen} closeModal={onCloseModal} onTokenSelect={onTokenSelected} selectedTokens={selectedTokens} />
      )}
    </div>
  )
}
