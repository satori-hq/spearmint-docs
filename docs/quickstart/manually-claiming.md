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
['https://sc-testnet.satori.art/#/123456789ASDFGHJKL']
// The claim code is: 123456789ASDFGHJKL
```

Use the claim code and `[RECEIVER_ACCOUNT_ID]` (the account you wish to own the NFT) to manually claim the NFT.

:::tip
Be sure the `[RECEIVER_ACCOUNT_ID]` matches the Spearmint network you are using! (If you are using `testnet`, it should be a `.testnet` account; if mainnet, it should be a `.near` account.)
:::

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/claim/body-code/nft`, {
	method: `POST`,
	body: JSON.stringify({
		code: `[CLAIM_CODE]`,
		receiverId: `[RECEIVER_ACCOUNT_ID]`
	})
})

```
<TryItNowWithEnv />


<Dialog />