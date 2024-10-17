import { QueryParameter, DuneClient } from "@duneanalytics/client-sdk";
import dotenv from "dotenv";
import { uniV2PairValue } from "./dexScreener";
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
dotenv.config();

// const query_parameters = [
//   QueryParameter.text("TextField", "Plain Text"),
//   QueryParameter.number("NumberField", 3.1415926535),
//   QueryParameter.date("DateField", "2022-05-04 00:00:00"),
//   QueryParameter.enum("ListField", "Option 1"),
// ];

// Exclude the debug logs from lower level dependency.
// console.debug = function () {};

// client
//   .runQuery({ queryId, query_parameters })
//   .then((response) => console.log(response.result?.rows));

interface PoolData {
  pool: string;
  proportion: number;
  token0: string;
  token1: string;
}

// const isPoolData = (obj: Record<string, unknown>): obj is PoolData => {
//   return typeof obj['pool'] === 'string' &&
//     typeof obj['proportion'] === 'number' &&
//     typeof obj['token0'] === 'string' &&
//     typeof obj['token1'] === 'string';
// };

const run = async (): Promise<void> => {
  const { DUNE_API_KEY } = process.env;
  const client = new DuneClient(DUNE_API_KEY ?? "");
  const queryId = 4164550;
  const {result} = await client.getLatestResult({queryId});
  const pools: PoolData[] = result!.rows.map(record => ({
    pool: record['pool'] as string,
    proportion: record['proportion'] as number,
    token0: record['token0'] as string,
    token1: record['token1'] as string
  }));
  const volumes = await Promise.all(
    pools.map(async p => {
      const value = await uniV2PairValue(p.pool);
      return {
        address: p.pool,
        value: (value || 0) * p.proportion
      };
    })
  );
  
    // Sort volumes by value in descending order
    const sortedVolumes = volumes.sort((a, b) => b.value - a.value);

    // Write sorted data to JSON file
    await writeFile('volumes.json', JSON.stringify(sortedVolumes, null, 2));
    console.log('Data written to volumes.json');
  
    // Convert sorted data to CSV
    const csvData = sortedVolumes
      .map(v => `${v.address},${v.value}`)
      .join('\n');
  
    // Write CSV data to file
    await writeFile('volumes.csv', csvData);
    console.log('Data written to volumes.csv');
};

run();
