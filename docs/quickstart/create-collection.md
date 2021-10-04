---
sidebar_position: 2
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create an NFT Collection

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/collection`, {
	method: 'POST',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		title: '[YOUR_DESIRED_COLLECTION_TITLE]'
	})
})
```
<TryItNowWithEnv />
<Dialog />

