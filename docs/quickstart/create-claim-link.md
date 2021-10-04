---
sidebar_position: 4
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create Claim Link

First you need your NFT Series ID. You can get a list below.

The response will be an array of `[SERIES_ID]` which is in the form: `[CONTRACT_ID]/[SERIES_TITLE]: { ... }`

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series`, {
	method: 'GET',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
})
```
<TryItNowWithEnv />

Now you can create a claim link for the NFT:

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/claim`, {
	method: 'POST',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		seriesId: '[SERIES_ID]',
		amount: [NUMBER_OF_LINKS]
	})
})
```
<TryItNowWithEnv />


<Dialog />