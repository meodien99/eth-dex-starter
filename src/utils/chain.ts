import { chainLogo } from "@/config/chain-logo";
import { tokens } from "@/data/tokens";

function formatAddress(address: `0x${string}` | undefined) {
  if (address) {
    return address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length);
  }
  return '';
}
function formatTransaction(transaction: string) {
  return transaction.substring(0, 24) + "...";
}
function formatEth(amount: number) {
  if (amount) {
    return amount.toString().substring(0, 8);
  }
  return '';
}
function formatEthDecimals(amount: string) {
  return amount.substring(0, 8);
}

function getChainLogo(id: number): string {
  return chainLogo.find(chain => chain.id === id)?.logo || "";
}

function getTokenLogo(symbol: string = ""): string {
  return `/tokens/${symbol.toLowerCase()}.png`;
}

function getAddressFromSymbol(symbol: string): string {
  return tokens.find((token) => token.symbol === symbol)?.address || '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // default is WETH
}

export {
  formatAddress,
  formatTransaction,
  formatEth,
  formatEthDecimals,
  getChainLogo,
  getAddressFromSymbol
}