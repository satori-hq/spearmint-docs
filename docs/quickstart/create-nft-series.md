---
sidebar_position: 3
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create an NFT Series

This is your NFT "definition". It will define what your NFT is and the media that it represents.

First you need to find out the `[CONTRACT_ID]` of your collection. You can do that by getting a list of your collections.

The list of collections will return keys and values. The `[CONTRACT_ID]` is the key for your collection data.


#### Example:
```js
{"jeff-handout-test.snft.testnet":{"title":"Jeff Handout Test","ts":1637199109816}}
// The collection's contract ID is: jeff-handout-test.snft.testnet
```

#### Getting Collections:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/collections`, {
	method: `GET`,
	headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
})
```
<TryItNowWithEnv />

#### Creating an NFT Series:

```js

await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/type`, {
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
<Dialog />
