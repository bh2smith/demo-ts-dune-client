import { QueryParameter, DuneClient } from "@duneanalytics/client-sdk";

const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");
const queryId = 1215383;
const query_parameters = [
  QueryParameter.text("TextField", "Plain Text"),
  QueryParameter.number("NumberField", 3.1415926535),
  QueryParameter.date("DateField", "2022-05-04 00:00:00"),
  QueryParameter.enum("ListField", "Option 1"),
];

// Exclude the debug logs from lower level dependency.
// console.debug = function () {};

client
  .runQuery({ queryId, query_parameters })
  .then((response) => console.log(response.result?.rows));
