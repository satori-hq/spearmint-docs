---
sidebar_position: 2
---
import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create a Collection

In order to get started you will need a Collection (Smart Contract deployed on NEAR) to create your NFT series from. Think of your contract/collection like an art collection that may contain many artworks, some of which are 1/1 and some 1/100 series.

***Collection (Smart Contract) > NFT Series > NFT***

When you create a new Collection via the "Try it now!" button below, you may notice that the request takes a couple seconds to return. That's because it deploying a new Smart Contract to the NEAR blockchain. Cool, huh! 😎

*NB: Currently, collection names must be unique globally across all Spearmint apps. This won't always be the case, but in the meantime, if you're trying to use a fairly generic collection name and it's not available, that's why!*

:::tip

1. Make sure you have the correct app selected. If the middle button below says **"No App Selected"**, click it and input the app name and API key you just received in your email (and subsequently activated).

2. Once you have your app set up, you won't need to fill in `[YOUR_APP_NAME]` and `[YOUR_API_KEY]` as they will be inserted automatically.

3. Collection title must be 32 characters or fewer.
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

#### Fetching Collections

In the next section, you will use the `[CONTRACT_ID]` of your new collection to create an NFT Series. You can get a list of your collections below below.

The list of collections will be in the format `{ [CONTRACT_ID]: [COLLECTION_DATA], ... }`.

Once you have your `[CONTRACT_ID]`, proceed to the next section to create an NFT Series!

Example response:

```js
{"lachlans-collection.snft.testnet":{"title":"Lachlan's Collection","ts":1637199109816}}
// The collection's contract ID is: lachlans-collection.snft.testnet
```

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/collections`, {
	method: `GET`,
	headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
})
```
<TryItNowWithEnv />
<Dialog />

