---
sidebar_position: 4
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create Claim Links

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

## Create Many Links

You can batch call the api and concatenate the results, outputting the final result to the console.

#### Example:

The TryItNow runner is expecting the results of an async function call. Here we wrap the output in an anon async function that calls itself. Inside the function we call the api several times, await each response one at a time (don't flood the api please) and then concatenate all the links from each response after the loop

```js
await (async () => {
	const results = [];
	const numBatches = parseInt([NUM_BATCHES]);
	for (let i = 0; i < numBatches; i++) {
		results.push(await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/claim`, {
			method: 'POST',
			headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
			body: JSON.stringify({
				seriesId: '[SERIES_ID]',
				amount: [NUMBER_OF_LINKS]
			})
		}).then((result) => result.json()));
	}
	return results.reduce((a, c) => a.concat(c), []);
})()
```
<TryItNowWithEnv />

<Dialog />