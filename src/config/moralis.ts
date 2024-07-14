import { EvmApi } from '@moralisweb3/evm-api';
import Moralis from 'moralis';

export async function initMoralisSDK() {
  if(Moralis.Core.isStarted) {
    return null;
  }

  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY
  });
}

export async function getEVMApiObject(): Promise<EvmApi> {
  await initMoralisSDK();

  return Moralis.EvmApi
}