export interface ITokenSwap {
  name: string;
  symbol: string;
  address: `0x${string}`;
  logo: string;
}

export interface IToken extends ITokenSwap {
  selected?: boolean;
}