import { QueryParameter, DuneClient } from "@duneanalytics/client-sdk";

const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 1215383;
const params = [
  QueryParameter.text("TextField", "Plain Text"),
  QueryParameter.number("NumberField", 3.1415926535),
  QueryParameter.date("DateField", "2022-05-04 00:00:00"),
  QueryParameter.enum("ListField", "Option 1"),
];

// Exclude the debug logs from lower level dependency.
// console.debug = function () {};

client.runQuery(queryID, {query_parameters: params}).then((executionResult) => console.log(executionResult.result?.rows));
