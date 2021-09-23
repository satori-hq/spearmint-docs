---
sidebar_position: 4
---
import { TryItNow } from '../../src/components/TryItNow'


# Create Claim Link


First you need your NFT type title. You can do that by getting a list of your types.

The response format will be: `[NFT_CONTRACT_ID]/[NFT_TYPE_TITLE]: { ... }`
#### Example:

```js
await fetch(`https://spearmint.satori.art/v1/api/[YOUR_APP_NAME]/types`, {
	method: 'GET',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
})
```
<TryItNow />

Now you can create a claim link for the NFT:

#### Example:

```js
await fetch(`https://spearmint.satori.art/v1/api/[YOUR_APP_NAME]/claim`, {
	method: 'PUT',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		contractId: '[NFT_CONTRACT_ID]',
		title: '[NFT_TYPE_TITLE]'
	})
})
```
<TryItNow />
