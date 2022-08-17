---
sidebar_position: 4
---

import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create Claim Links

A **claim link** is a fundamental concept of Spearmint, and provides the ability to seamlessly get your NFTs into users' hands (or wallets, as the case may be). Claim links direct a user to a "claim page" that prompts users to connect their NEAR wallet if they have one, or else create a new wallet via [linkdrop](https://github.com/near/near-linkdrop) (this creates a pre-funded "implicit account," and all the user will need to do is choose a human-readable Account ID, save their seed phrase and claim your NFT! Easy as 🥧.)

You will need your NFT `[SERIES_ID]`. If you don't have that, go back to the "Create an NFT Series" page and follow the instructions under "Fetching All Series," then come back here.

Once you have your `[SERIES_ID]`, you can use it to create a claim link for the NFT Series! 🎉

:::tip
You can create a **maximum** of 500 claim links per request. To get more than 500 claim links, see "Create Many Links" below.
:::

**Example (without `claimData`):**

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/claim`, {
  method: `POST`,
  headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
  body: JSON.stringify({
    seriesId: `[SERIES_ID]`,
    amount: [NUMBER_OF_LINKS],
  }),
});
```

<TryItNowWithEnv />

**With `claimData`:**

A cool feature of Spearmint is that you can define **webhooks** that Spearmint will call back to when a user claims an NFT &/or creates a NEAR account via linkdrop. This means that you can take action in your app in response to these Spearmint/NEAR events!

You can also include any other data you wish inside the `claimData` object, and it will be posted back to your webhook along with the event data.

**Example `claimData` object:**

```js
{
	webhooks: {
		onNftClaim: string // e.g. https://my-api.com/webhooks/nft-claimed
		onWalletCreate: string // e.g. https://my-api.com/webhooks/wallet-created
	},
	...otherData, // any other properties that you wish to store on this claim object
}
```

If you have specified webhooks when requesting a claimlink, Spearmint will send a `POST` request to these endpoints with the following body:

**On NFT Claim:**

```js
{
	accountId: string // e.g. your-new-nft-holder.near
	timestamp: string // timestamp of the nft mint
	data: Record<any, any> // any additional data you included inside the `claimData` object when initially requesting the claimlink
}
```

**On Linkdrop (new account created):**

```js
{
	timestamp: string // timestamp of the linkdrop
	data: Record<any, any> // any additional data you included inside the `claimData` object when initially requesting the claimlink
}
```

**Example (with `claimData`):**

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/claim`, {
  method: `POST`,
  headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
  body: JSON.stringify({
    seriesId: `[SERIES_ID]`,
    amount: [NUMBER_OF_LINKS],
    claimData: {
      webhooks: {
        onNftClaim: `[YOUR_NFT_CLAIM_WEBHOOK]`,
        onWalletCreate: `[YOUR_WALLET_CREATE_WEBHOOK]`,
      },
    },
  }),
});
```

<TryItNowWithEnv />

#### Example Responses by Status Code:

`200` (success):

```js
string[] // an array of claimlinks
```

`400`, `401`, `403` (validation or other non-internal error):

```js
/*

More info on status codes:
- 400 implies that your request is malformed
- 401 implies that the credentials (API key) you provided do not match our records for your account
- 403 implies that there are no remaining NFTs for this series, thus a claimlink cannot be generated
- 404 implies that the series ID you provided cannot be found. Please check the series ID and retry the request.

*/

{
  error: string; // a descriptive error string indicating what went wrong and how to resolve the error
}
```

`500` (internal error):

```js
/*

A 500 response code implies that your request was formatted correctly, but there was an internal error completing your request.

*/

{
  error: string; // a descriptive error string indicating what went wrong
}
```

#### CREATE MORE THAN 500 CLAIM LINKS

You can batch-call the API and concatenate the results, outputting the final result to the console.

#### Example:

The `TryItNow` runner is expecting the results of an async function call. Here we wrap the output in an anon `async` function that calls itself. Inside the function we call the api several times, await each response one at a time (don't flood the API please) and then concatenate all the links from each response after the loop

```js
await (async () => {
  const results = [];
  const numBatches = parseInt([NUM_BATCHES]);
  for (let i = 0; i < numBatches; i++) {
    results.push(
      await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/claim`, {
        method: `POST`,
        headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
        body: JSON.stringify({
          seriesId: `[SERIES_ID]`,
          amount: [NUMBER_OF_LINKS],
        }),
      }).then((result) => result.json())
    );
  }
  return results.reduce((a, c) => a.concat(c), []);
})();
```

<TryItNowWithEnv />

<Dialog />
