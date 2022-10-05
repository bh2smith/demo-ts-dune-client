import { QueryParameter, DuneClient } from "@cowprotocol/ts-dune-client";

const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 1215383;
const parameters = [
  QueryParameter.text("TextField", "Plain Text"),
  QueryParameter.number("NumberField", 3.1415926535),
  QueryParameter.date("DateField", "2022-05-04 00:00:00"),
  QueryParameter.enum("ListField", "Option 1"),
];

// Exclude the debug logs from lower level dependency.
// console.debug = function () {};

client.refresh(queryID, parameters).then((executionResult) => console.log(executionResult.result?.rows));
