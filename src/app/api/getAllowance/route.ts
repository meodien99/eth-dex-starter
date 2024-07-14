import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('tokenAddress');
  const wallet = searchParams.get('walletAddress');
  const chain = searchParams.get('chain') || '1'; // default ETH chain

  if (!address || !wallet) {
    return NextResponse.json({
      status: 400,
      message: "No address providen."
    }, {
      status: 400,
    });
  }

  const url = `${process.env.AGGREGATOR_API_URL}/${chain}/approve/allowance`;
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.AGGREGATOR_API_KEY}`
    },
    params: {
      tokenAddress: address,
      walletAddress: wallet
    }
  }
  
  try {
    const response = await axios.get(url, config);

    if (response) {
      return NextResponse.json(response.data)
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