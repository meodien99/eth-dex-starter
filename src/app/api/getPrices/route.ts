import { initMoralisSDK } from '@/config/moralis';
import Moralis from 'moralis';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await initMoralisSDK();

  const { searchParams } = new URL(request.url);
  const addressOne = searchParams.get('addressOne');
  const addressTwo = searchParams.get('addressTwo');
  const chain = searchParams.get('chain') || '0x1'; // default ETH chain

  if (!addressOne || !addressTwo) {
    return NextResponse.json({
      status: 400,
      message: "No address providen."
    }, {
      status: 400,
    });
  }

  try {
    const [responseOne, responseTwo] = await Promise.all([
      Moralis.EvmApi.token.getTokenPrice({
        chain,
        address: addressOne
      }),
      Moralis.EvmApi.token.getTokenPrice({
        chain,
        address: addressTwo
      })
    ]);

    if (responseOne && responseTwo) {
      const tokenOnePrice = responseOne.raw.usdPrice || 0;
      const tokenOnePriceFormatted = responseOne.raw.usdPriceFormatted || '0';

      const tokenTwoPrice = responseTwo.raw.usdPrice || 0;
      const tokenTwoPriceFormatted = responseTwo.raw.usdPriceFormatted || '0';

      const ratio = tokenOnePrice / tokenTwoPrice;

      const response = {
        tokenOnePrice,
        tokenOnePriceFormatted,
        tokenTwoPrice,
        tokenTwoPriceFormatted,
        ratio
      }

      return NextResponse.json(response);
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