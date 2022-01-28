---
sidebar_position: 3
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create an NFT Series

This is your NFT "template." It will define what your NFT is and the media that it represents.

First you need to find out the `[CONTRACT_ID]` of your collection. You can do that by getting a list of your collections.

The list of collections will be in the format `{ [CONTRACT_ID]: [COLLECTION_DATA], ... }`.


Example response:

```js
{"lachlans-collection.snft.testnet":{"title":"Lachlan's Collection","ts":1637199109816}}
// The collection's contract ID is: lachlans-collection.snft.testnet
```

#### Getting Collections:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/collections`, {
	method: `GET`,
	headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
})
```
<TryItNowWithEnv />

#### Creating an NFT Series

:::tip
1. An NFT series can be created with or without royalties, as you wish. We demonstrate both options below.

2. When you create a series, the template for that series is added to the deployed Smart Contract. Because this involves a state change on the NEAR blockchain, the request will take a couple seconds to return - just like when you created your Collection.
:::

*NB: `description` property is optional in both cases*

**No royalties:**

```js

await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series`, {
	method: `POST`,
	headers: new Headers({
		'authorization': `Bearer [YOUR_API_KEY]`,
		'nft-content': JSON.stringify({
			contractId: `[CONTRACT_ID]`,
			title: `[SERIES_TITLE]`,
			description: `[NFT_DESCRIPTION]`,
			copies: [NUMBER_OF_COPIES],
		})
	}),
	body: await fetch(`[IMAGE_URL]`).then(r => r.arrayBuffer())
})
```
<TryItNowWithEnv />

**With royalties:**

:::tip
To specify royalties for your NFT series, include optional **`royalty`** property in `nft-content` header.

**`royalty`** can contain up to 10 entries in the format `[ACCOUNT_ID]: [ROYALTY_AMOUNT]`.

**`ROYALTY_AMOUNT`** should be calculated as **percentage points * 100**. E.g. 10% == `1000` or 1% == `100`.

**WARNING:**
- All Account IDs specified in royalty must be valid (existing) accounts
- No more than 10 accounts may be specified
:::

*NB: `description` property is optional*

```js

await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series`, {
	method: `POST`,
	headers: new Headers({
		'authorization': `Bearer [YOUR_API_KEY]`,
		'nft-content': JSON.stringify({
			contractId: `[CONTRACT_ID]`,
			title: `[SERIES_TITLE]`,
			description: `[NFT_DESCRIPTION]`,
			copies: [NUMBER_OF_COPIES],
			royalty: {
				[ACCOUNT_ID]: [ROYALTY_AMOUNT],
			}
		})
	}),
	body: await fetch(`[IMAGE_URL]`).then(r => r.arrayBuffer())
})
```
<TryItNowWithEnv />
<Dialog />
