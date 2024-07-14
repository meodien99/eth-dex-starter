import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
    // [sepolia.id]: http(),
  },
});
