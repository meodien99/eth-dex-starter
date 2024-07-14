import axios from 'axios';

interface IGetPriceResponse {
  usdPriceFormatted: string;
  usdPrice: number;
}

export async function getPrice(address: string): Promise<IGetPriceResponse> {
  const response = await axios.get(`/api/getPrice?address=${address}`);

  const usdPrice: number = response.data?.usdPrice || 0;
  const usdPriceFormatted: string = response.data?.usdPriceFormatted || '0';

  return { usdPrice, usdPriceFormatted };
}

interface IGetPricesRatioResponse {
  tokenOneUsdPrice: number;
  tokenTwoUsdPrice: number;
  tokenOnePriceFormatted: string;
  tokenTwoPriceFormatted: string;
  ratio: number;
}

export async function getPricesRatio(addressOne: string, addressTwo: string): Promise<IGetPricesRatioResponse> {
  const response = await axios.get(`/api/getPrices?addressOne=${addressOne}&addressTwo=${addressTwo}`);
  return response.data;
}

interface IGetAllowanceResponse {
  allowance: string;
}

export async function getAllowance(tokenAddress: string, accountAddress: string): Promise<IGetAllowanceResponse> {
  const response = await axios.get(`/api/getAllowance?tokenAddress=${tokenAddress}&walletAddress=${accountAddress}`);

  return response.data;
}

interface IApproveTransactionResponse {
  data: `0x${string}`;
  gasPrice: string;
  to: `0x${string}`;
  value: string;
}

export async function approveTransaction(tokenAddress: string, amountInWei?: string): Promise<IApproveTransactionResponse> {
  const params = new URLSearchParams();
  params.set('tokenAddress', tokenAddress);

  if (amountInWei) {
    params.set('amount', amountInWei);
  }

  const response = await axios.get(`/api/approveTransaction?${params.toString()}`);

  return response.data;
}

interface ISwapResponse {
  from: `0x${string}`,
  to: `0x${string}`,
  data: `0x${string}`,
  value: string,
  gasPrice: string,
  gas: number
}

interface ISwapPayload {
  fromTokenAddress: `0x${string}`,
  toTokenAddress: `0x${string}`,
  account: `0x${string}`,
  amount: string;
  slippage?: number;
  chain?: string;
}
export async function swap({ fromTokenAddress, toTokenAddress, account, amount, slippage }: ISwapPayload): Promise<ISwapResponse> {
  const params = new URLSearchParams();
  params.set('fromTokenAddress', fromTokenAddress);
  params.set('toTokenAddress', toTokenAddress);
  params.set('accountAddress', account);
  params.set('amount', amount);

  if(slippage) {
    params.set('slippage', amount);
  }
  const response = await axios.get(`/api/swap?${params.toString()}`);

  return response.data.tx;
}