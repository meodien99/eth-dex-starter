import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fromTokenAddress = searchParams.get('fromTokenAddress');
  const toTokenAddress = searchParams.get('toTokenAddress');
  const amount = searchParams.get('amount');
  const slippage = searchParams.get('slippage') || 1;
  const account = searchParams.get('accountAddress');
  const chain = searchParams.get('chain') || '1'; // default ETH chain

  if (!fromTokenAddress || !toTokenAddress || !account || !amount) {
    return NextResponse.json({
      status: 400,
      message: "No address providen."
    }, {
      status: 400,
    });
  }

  const url = `${process.env.AGGREGATOR_API_URL}/${chain}/swap`;
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.AGGREGATOR_API_KEY}`
    },
    params: {
      src: fromTokenAddress,
      dst: toTokenAddress,
      from: account,
      origin: account,
      amount,
      slippage
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