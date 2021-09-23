---
sidebar_position: 1
---
import { TryItNow } from '../../src/components/TryItNow'

# Register

In order to start with Spearmint you'll need to register yourself and your app name.

:::tip

Anything in all caps and marked with square brackets will need to be replaced by you.

e.g. `[REPLACE_ME]`

:::

You will be emailed your api key and an activation link.

You have 2 minutes to activate [YOUR_DESIRED_APP_NAME] otherwise another user can claim it.

#### Example:

```js
await fetch(`https://spearmint.satori.art/v1/api/[YOUR_DESIRED_APP_NAME]/register`, {
	method: 'PUT',
    headers: new Headers({ 'Referrer-Policy': 'no-referrer' }),
	body: JSON.stringify({
		email: '[YOUR_EMAIL]'
	})
})
```
<TryItNow />
