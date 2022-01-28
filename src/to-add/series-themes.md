---
sidebar_position: 5
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Series Themes

You can set the custom theme of how your claim links will display. First you need to get the series id for your NFT.

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series`, {
	method: 'GET',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
})
```
<TryItNowWithEnv />

Now use this with one of the following theme options:
- default

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series-theme`, {
	method: 'POST',
	headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
	body: JSON.stringify({
		seriesId: `[SERIES_ID]`,
		theme: `[THEME_NAME]`
	})
})
```
<TryItNowWithEnv />


<Dialog />