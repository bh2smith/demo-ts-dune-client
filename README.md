# Example Use Cases for Dune Client SDK (NodeJS)

Demonstrating how to use [@duneanalytics/client-sdk](https://www.npmjs.com/package/@duneanalytics/client-sdk)

## Basic Example: Install, Set ENV & Run

```sh
git clone git@github.com:bh2smith/demo-ts-dune-client.git
cd demo-ts-dune-client
yarn
```

```sh
export DUNE_API_KEY=<YOUR-DUNE-API-KEY>
```

```sh
npx ts-node src/index.ts
# or equivalently
yarn test
```

Runs the following sample script:

```ts
import { QueryParameter, DuneClient } from "@duneanalytics/client-sdk";

const client = new DuneClient(process.env.DUNE_API_KEY!);
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
```

Should yield the following output in your shell:

```sh
[
  {
    date_field: '2022-05-04 00:00:00',
    list_field: 'Option 1',
    number_field: '3.1415926535',
    text_field: 'Plain Text'
  }
]
```

## Github Actions

There is a dedicated [github action](https://github.com/marketplace/actions/dune-query-updater) for syncing queries changes to Dune. Check out the [ci.yaml](./.github/workflows/ci.yaml) file to see how its used and observe this [successful run](https://github.com/bh2smith/demo-ts-dune-client/actions/runs/.8480279768)