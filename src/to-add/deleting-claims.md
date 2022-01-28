---
sidebar_position: 7
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Deleting Claims

Manually delete unused claims since a period in time, e.g. 1 week ago.

#### Get NFT Series ID:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series`, {
	method: 'GET',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
})
```
<TryItNowWithEnv />

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/delete-claims`, {
	method: `POST`,
	headers: new Headers({
		'authorization': `Bearer [YOUR_API_KEY]`,
	}),
	body: JSON.stringify({
		seriesId: `[SERIES_ID]`,
		since: Date.now() - [NUMBER_OF_HOURS] * 3600
	})
})
```
<TryItNowWithEnv />

<Dialog />