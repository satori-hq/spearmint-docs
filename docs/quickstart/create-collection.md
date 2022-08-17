---
sidebar_position: 2
---

import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create a Collection

In order to create your first NFT series, you will need a Collection (a Smart Contract deployed on NEAR). Think of your contract/collection like an art collection that may contain many artworks, some of which are 1/1 and some 1/100 series:

**_Collection (Smart Contract) > NFT Series > NFT_**

Let's go! 🚀

**Step 1: Funding your collection**

💰 It costs 5 NEAR to deploy a collection. This covers the cost to [store](https://docs.near.org/docs/concepts/storage-staking) your contract code on the NEAR blockchain. The first step is to go to the [NEAR wallet](https://wallet.testnet.near.org), create an account if you don't already have one, and **transfer 5 NEAR to `snft.testnet`.** When you've made the transfer, **copy the transaction hash** of your funding transfer and come back here to proceed!

**Step 2: Creating your collection**

When you create a new Collection via the "Try it now!" button below, you may notice that the request takes a couple seconds to return. That's because it deploying a new Smart Contract to the NEAR blockchain. Cool, huh! 😎

_NB: Currently, collection names must be unique globally across all Spearmint apps. This won't always be the case, but in the meantime, if you're trying to use a fairly generic collection name and it's not available, that's why!_

:::tip

1. Make sure you have the correct app selected. If the middle button below says **"No App Selected"**, click it and input the app name and API key you just received in your email (and subsequently activated).

2. Once you have your app set up, you won't need to fill in `[YOUR_APP_NAME]` and `[YOUR_API_KEY]` as they will be inserted automatically.

3. Collection title must be 32 characters or fewer.

:::

#### Example Request:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/collection`, {
  method: `POST`,
  headers: new Headers({
    authorization: `Bearer [YOUR_API_KEY]`,
    "funding-hash": `[YOUR_FUNDING_HASH]`,
  }),
  body: JSON.stringify({
    title: `[YOUR_DESIRED_COLLECTION_TITLE]`,
  }),
});
```

<TryItNowWithEnv />

#### Example Responses by Status Code:

`200` (success):

```js
/*

For more information on FinalExecutionOutcome shape, please visit https://near.github.io/near-api-js/interfaces/providers_provider.finalexecutionoutcome.html

*/

{
  contractId: string; // the contract ID for the collection you just created
  accountResponse: FinalExecutionOutcome; // the outcome of the Create Account call to create `contractId` account
  deployResponse: FinalExecutionOutcome; // the outcome of the Deploy Contract and Init Contract calls to `contractId` account
}
```

`400`, `401`, `403` (validation error):

```js
/*

More info on status codes:
- 400 implies that the funding-hash provided in your request header can be reused
- 401 implies that the credentials (API key) you provided do not match our records for your account
- 403 implies that the funding-hash you provided has previously been used and thus cannot be reused

*/

{
  error: string; // a descriptive error string indicating what went wrong in your request and how to resolve the validation error
}
```

`500` (internal error):

```js
/*

A 500 response code implies that your request was formatted correctly and the funding-hash provided in your request header was valid, but there was an internal error completing your request.

The funding-hash cannot be re-used, but we will have refunded the funds to the NEAR account that funded the initial transaction.

*/

{
  error: {
    message: string; // a descriptive error string indicating what went wrong in your request
    refundHash?: string; // transaction hash for the refund transaction
    refundError?: string // in the very unlikely event that we were unable to process your refund, those details will be provided here. If you encounter this property, please reach out to us at support@satori.art.
  };
}
```

#### FETCHING COLLECTIONS

In the next section (Create an NFT Series), you will use the `[CONTRACT_ID]` of your new collection to create an NFT Series. You can get a list of your collections below below.

The list of collections will be in the format `{ [CONTRACT_ID]: [COLLECTION_DATA], ... }`.

Once you have your `[CONTRACT_ID]`, proceed to the next section to create an NFT Series!

#### Example Request:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/collections`, {
  method: `GET`,
  headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
});
```

<TryItNowWithEnv />

#### Example Responses by Status Code:

`200` (success):

```js
/*

An object where the keys are your contract IDs, and the values are in the following shape:

{
  title: string // the title of your contract, as it will appear in the NEAR wallet and other UIs
  ts: number // the timestamp when your contract/collection was created
}

E.g.:

{

  "lachlans-collection.snft.testnet": {

    "title":"Lachlan's Collection",

    "ts":1637199109816

  },

  ...

}

*/
```

`401` (validation error): the credentials (API key) you provided do not match our records for your account.

<Dialog />
