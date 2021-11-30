---
sidebar_position: 2
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create an NFT Collection

In order to get started you will need an account to create NFT series from.

Collection > NFT Series > NFT

e.g. an art collection that may contain many artworks, some of which are 1/1 and some 1/100 series.

:::tip
The button `No App Selected` is for the app name and API KEY you just received in your email.

Click it and get your app set up, then you don't need to fill in: `[YOUR_APP_NAME]` and `[YOUR_API_KEY]` as it will do this automatically.
:::

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/collection`, {
	method: `POST`,
	headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
	body: JSON.stringify({
		title: `[YOUR_DESIRED_COLLECTION_TITLE]`
	})
})
```
<TryItNowWithEnv />
<Dialog />

