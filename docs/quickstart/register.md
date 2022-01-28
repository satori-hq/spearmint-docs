---
sidebar_position: 1
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Register Your App

In order to get started with Spearmint, you'll need to register with your email and choose an app name.

:::tip
1. Anything in these docs that is in all caps and marked with square brackets will need to be replaced by you. E.g. `[REPLACE_ME]`

2. `[API_ORIGIN]` corresponds to the `Network` button below and is auto-filled.
:::

You will be emailed your API key and an activation link.

You will have 2 minutes to activate your app!


:::tip
1. App name cannot contain `/` and must be 32 characters or fewer.

2. App name will be converted to a slug, e.g. `Lachlan's App` -> `lachlans-app`.
:::

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_DESIRED_APP_NAME]/register`, {
	method: `POST`,
    headers: new Headers({ 'Referrer-Policy': `no-referrer` }),
	body: JSON.stringify({
		email: `[YOUR_EMAIL]`
	})
})
```
<TryItNowWithEnv requiresKeys={false} />
<Dialog />

:::tip
Be sure to activate your new app via the link in your email before continuing to the next step!
:::
