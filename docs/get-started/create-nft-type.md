---
sidebar_position: 3
---
import { TryItNow } from '../../src/components/TryItNow'

# Create an NFT Type

First you need to find out your collections contract ID. You can do that by getting a list of your collections.
#### Example:

```js
await fetch(`https://spearmint.satori.art/v1/api/[YOUR_APP_NAME]/collections`, {
	method: 'GET',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
})
```
<TryItNow />

#### Example NFT TYPE:

```js

await fetch(`https://spearmint.satori.art/v1/api/[YOUR_APP_NAME]/type`, {
	method: 'PUT',
	headers: new Headers({
		'authorization': 'Bearer [YOUR_API_KEY]',
		'nft-content': JSON.stringify({
			contractId: '[COLLECTION_CONTRACT_ID]',
			title: '[NFT_TYPE_TITLE]',
			description: '[NFT_DESCRIPTION]',
			copies: [NUMBER_OF_COPIES],
		})
	}),
	body: await fetch('[IMAGE_URL]').then(r => r.arrayBuffer())
})
```
<TryItNow />
