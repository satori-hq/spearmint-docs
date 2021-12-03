---
sidebar_position: 1
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Register

In order to start with Spearmint you'll need to register with your email and choose an app name.

:::tip
Anything in these docs that is in all caps and marked with square brackets will need to be replaced by you.

e.g. `[REPLACE_ME]`

`[API_ORIGIN]` corresponds to the Network button below and is auto filled.
:::

You will be emailed your api key and an activation link.

You have 2 minutes to activate your app.


:::tip
App names will be converted to a slug.

e.g. `Matt's App` -> `matts-app`
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
