---
sidebar_position: 5
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Manually Claiming

Manually claim the linkdrop:

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/claim/body-code/linkdrop`, {
	method: 'POST',
	body: JSON.stringify({
		code: '[CLAIM_CODE]',
		redirectUrl: encodeURIComponent('[ACCOUNT_CREATION_REDIRECT_URL]')
	})
})
```
<TryItNowWithEnv />

Manually claim the NFT:

For `[RECEIVER_ACCOUNT_ID]` you can use `testnet` if you are on testnet and are just testing functionality.

#### Example:

```js
await fetch(`[API_ORIGIN]/v1/claim/body-code/nft`, {
	method: 'POST',
	body: JSON.stringify({
		code: '[CLAIM_CODE]',
		receiverId: '[RECEIVER_ACCOUNT_ID]'
	})
})

```
<TryItNowWithEnv />


<Dialog />