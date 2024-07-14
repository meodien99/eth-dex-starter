import { initMoralisSDK } from '@/config/moralis';
import Moralis from 'moralis';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await initMoralisSDK();

  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const chain = searchParams.get('chain') || '0x1'; // default ETH chain

  if (!address) {
    return NextResponse.json({
      status: 400,
      message: "No address providen."
    }, {
      status: 400,
    });
  }

  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain,
      address
    });

    if (response) {
      return NextResponse.json(response.raw)
    } else {
      return NextResponse.json({
        status: 400,
        message: 'Invalid params.'
      }, {
        status: 400,
      });
    }
  } catch (error) {
    return NextResponse.json(null, {
      status: 500,
      statusText: error instanceof Error ? error.message : 'Internal Server Error.'
    });
  }
}