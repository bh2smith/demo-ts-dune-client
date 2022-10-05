# demo-ts-dune-client
Small repo demonstrating how to use the ts-dune-client


## Clone, install, set ENV and Run

```sh
git clone git@github.com:bh2smith/demo-ts-dune-client.git
cd demo-ts-dune-client
yarn
export DUNE_API_KEY=<YOUR-DUNE-API-KEY>
npx ts-node src/index.ts
```


Will yield the following output in your shell:

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