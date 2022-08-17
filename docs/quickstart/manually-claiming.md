---
sidebar_position: 6
---

import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Manually Claiming

<!-- Manually claim a linkdrop:

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/claim/body-code/linkdrop`, {
	method: `POST`,
	body: JSON.stringify({
		code: `[CLAIM_CODE]`,
		redirectUrl: encodeURIComponent(`[ACCOUNT_CREATION_REDIRECT_URL]`)
	})
})
```
<TryItNowWithEnv /> -->

#### Manually claim an NFT

First you will need to get a claim code by generating a claim link (see previous section) and extracting the claim code from the link.

Example:

```js
["https://sc-testnet.satori.art/#/123456789ASDFGHJKL"];
// The claim code is: 123456789ASDFGHJKL
```

Use the claim code and `[RECEIVER_ACCOUNT_ID]` (the account you wish to own the NFT) to manually claim the NFT.

:::tip
Be sure the `[RECEIVER_ACCOUNT_ID]` matches the Spearmint network you are using! (If you are using `testnet`, it should be a `.testnet` account; if mainnet, it should be a `.near` account.)
:::

#### Example Request:

```js
await fetch(`[API_ORIGIN]/v1/claim/body-code/nft`, {
  method: `POST`,
  body: JSON.stringify({
    code: `[CLAIM_CODE]`,
    receiverId: `[RECEIVER_ACCOUNT_ID]`,
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
	hashes: string[] // an array containing the transaction hashes associated with the NFT mint contract call
	res: FinalExecutionOutcome // the outcome of the NFT mint contract call
	success: boolean // a boolean indicating whether the mint was successful or not
}

```

`400`, `401`, `403` (validation or other non-internal error):

```js
/*

More info on status codes:
- 401 implies that the credentials (API key) you provided do not match our records for your account
- 403 implies that this claim code has already been used to mint an NFT and cannot be reused. Please generate a new claimlink to obtain a new claim code.

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

<Dialog />
