
interface IChainLogoItem {
  id: number;
  name: string;
  logo: string;
};

export const chainLogo = [
  {
    id: 1,
    name: "Ethereum",
    logo: "/chains/eth.webp"
  },
  {
    id: 42161,
    name: "Arbitrum",
    logo: "/chains/arbitrum.svg"
  },
  {
    id: 137,
    name: "Polygon",
    logo: "/chains/polygon.svg"
  },
  {
    id: 10,
    name: "Optimism",
    logo: "/chains/optimism.svg"
  }
];