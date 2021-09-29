---
sidebar_position: 2
---
import { TryItNow } from '../../src/components/TryItNow'

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
<TryItNow />

