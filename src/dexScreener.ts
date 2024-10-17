export async function uniV2PairValue(
  address: string
): Promise<number | null> {
  try {
    // Make a request to the Dex Screener API using fetch
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/pairs/ethereum/${address}`
    );

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      console.error(
        `Failed to fetch data from the API. Status: ${response.status}`
      );
      return null;
    }

    // Parse the response data as JSON
    const data: ResponseData = await response.json();

    // Check if the response contains pairs
    if (data && data.pair && data.pair.liquidity) {
      return data.pair.liquidity.usd;
    }
    return null;

  } catch (error) {
    console.error(
      `Failed to fetch token ${address} from the API: ${(error as Error).message}`
    );
    return null;
  }
}

interface Token {
  address: string;
  name: string;
  symbol: string;
}

interface Transactions {
  buys: number;
  sells: number;
}

interface Txns {
  m5: Transactions;
  h1: Transactions;
  h6: Transactions;
  h24: Transactions;
}

interface Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface PriceChange {
  m5: number;
  h1: number;
  h6: number;
  h24: number;
}

interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}

interface Pair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels: string[];
  baseToken: Token;
  quoteToken: Token;
  priceNative: string;
  priceUsd: string;
  txns: Txns;
  volume: Volume;
  priceChange: PriceChange;
  liquidity: Liquidity;
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

interface ResponseData {
  schemaVersion: string;
  pair: Pair;
}
