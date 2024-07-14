'use client'
import { approveTransaction, getAllowance, swap } from '@/app/services';
import { config } from '@/config/chain-config';
import { showToast } from '@/utils/toast';
import React, { useCallback, useState } from 'react';
import { erc20Abi, parseEther, parseUnits } from 'viem';
import { useSendTransaction } from 'wagmi';
import { readContract } from 'wagmi/actions';

interface ISwapButtonProps {
  enabled: boolean;
  walletAddress: `0x${string}` | undefined;
  inputAddress: `0x${string}` | undefined;
  outputAddress: `0x${string}` | undefined;
  value: string;
}

export const SwapButton: React.FC<ISwapButtonProps> = ({ value, enabled, walletAddress, outputAddress, inputAddress }) => {
  const { sendTransaction } = useSendTransaction();
  const [loading, setLoading] = useState(false);

  const onSwapBtnClick = useCallback(async () => {

    if (walletAddress && inputAddress && outputAddress) {
      setLoading(true);
      const res = await getAllowance(inputAddress, walletAddress);

      // not approved yet
      if (res?.allowance === '0') {
        // in order to reduce rate limits, call the approval in 1s after getting allowance 
        // ref: https://help.1inch.io/en/articles/8422842-common-api-error-messages-explained
        setTimeout(async () => {
          const result = await approveTransaction(inputAddress); // we can set limited gas price to send here.
          if (result?.data) {
            const { data, to, value: v } = result;

            sendTransaction({
              data,
              to,
              value: parseEther(v, 'wei')
            });
          }
        }, 1000);
      } else {
        const decimals = await readContract(config, {
          abi: erc20Abi,
          address: inputAddress,
          functionName: 'decimals'
        });

        const amountByDecmials = parseUnits(value, decimals).toString();

        // in order to reduce rate limits, call the approval in 1s after getting allowance 
        // ref: https://help.1inch.io/en/articles/8422842-common-api-error-messages-explained
        setTimeout(async () => {
          const payload = await swap({
            fromTokenAddress: inputAddress,
            toTokenAddress: outputAddress,
            amount: amountByDecmials,
            account: walletAddress
          });


          sendTransaction({
            data: payload.data,
            to: payload.to,
            value: parseEther(payload.value, 'wei'),
          }, {
            onSuccess(data, variables, context) {
              setLoading(false);
              showToast('success', "Transaction success!");
            },
            onError(error, variables, context) {
              setLoading(false);
              showToast('error', "Transaction failed!");
            },
          });
        }, 1000);
      }
    }
  }, [walletAddress, value, inputAddress, outputAddress, sendTransaction]);

  const text = loading ? 'Waiting..' : (enabled ? 'Swap' : 'Select Token');

  return (
    <button
      onClick={onSwapBtnClick}
      type="button"
      disabled={!enabled}
      className="w-full mt-4 rounded-full bg-green-600 px-4 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-green-500 disabled:bg-green-900 disabled:text-green-950"
    >
      <span>{text}</span>
    </button>
  )
}