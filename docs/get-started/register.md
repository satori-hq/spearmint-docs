---
sidebar_position: 1
---

# Register

In order to start with Spearmint you'll need to register yourself and your app name.

:::tip

Anything in all caps and marked with square brackets will need to be replaced by you.

e.g. `[REPLACE_ME]`

:::

### Example:

```js
await fetch(`https://spearmint.satori.art/v1/api/[YOUR_DESIRED_APP_NAME]/register`, {
	method: 'PUT',
	body: JSON.stringify({
		email: '[YOUR_EMAIL]'
	})
}).then((res) => res.json())
```
<a className="custom-button table-of-contents__link" onClick={({ target }) => {
	let code = target.previousSibling.textContent;
	const matches = code.match(/\[.*?\]/gi);
	matches.forEach((match) => code = code.replace(match, window.prompt(match)));
	eval('(async () => ' + code.substr(0, code.length - 4) + ')()');
}}>
	Try it now!
</a>

You will be emailed your api key and an activation link.

You have 2 minutes to activate [YOUR_DESIRED_APP_NAME] otherwise another user can claim it.

## Create an NFT Collection

```
await fetch(`https://spearmint.satori.art/v1/api/[YOUR_APP_NAME]/collection`, {
	method: 'PUT',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		title: [YOUR_DESIRED_COLLECTION_TITLE]
	})
}).then((res) => res.json())

/// Example

await fetch(`https://spearmint.satori.art/v1/api/test/collection`, {
	method: 'PUT',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		title: 'My Sample NFT Title 🥰🔥🚀'
	})
}).then((res) => res.json())
```

## Create an NFT Type (series)

```
/// Example

await fetch(`https://spearmint.satori.art/v1/api/test/type`, {
	method: 'PUT',
	headers: new Headers({
		'authorization': 'Bearer 4jNUIXJhsTYnHUGqbSiWv',
		'nft-content': JSON.stringify({
			contractId: 'test2.snft.testnet',
			title: 'test-' + Date.now(),
			description: '',
			copies: 10,
		})
	}),
	body: await fetch('https://cloudflare-ipfs.com/ipfs/bafkreicuyyxcplcniyz3t2r5soa7ltjj562gpetdunnidrix3r2ztgd6he').then(r => r.arrayBuffer())
}).then((res) => res.json())

```

## Create a Claim

```
await fetch(`https://spearmint.satori.art/v1/api/[YOUR_APP_NAME]/claim`, {
	method: 'PUT',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		contractId: [NFT_CONTRACT_ID],
		title: [NFT_TYPE]
	})
}).then((res) => res.json())

/// Example

await fetch(`https://spearmint.satori.art/v1/api/test/claim`, {
	method: 'PUT',
	headers: new Headers({ authorization: 'Bearer 4jNUIXJhsTYnHUGqbSiWv' }),
	body: JSON.stringify({
		contractId: 'test2.snft.testnet',
		title: 'test'
	})
}).then((res) => res.json())
```

## Manually Claim the Linkdrop

```
/// Example

await fetch(`https://spearmint.satori.art/v1/claim/body-code/linkdrop`, {
	method: 'POST',
	body: JSON.stringify({
		code: 'VW5lW7-oR5bgPZCibOLyP',
		redirectUrl: encodeURIComponent(window.location.href)
	})
}).then((res) => res.json())
```

## Manually Claim the NFT

```

/// Example

await fetch(`https://spearmint.satori.art/v1/claim/body-code/nft`, {
	method: 'POST',
	body: JSON.stringify({
		code: 'VW5lW7-oR5bgPZCibOLyP',
		receiverId: 'spearmint2.testnet'
	})
}).then((res) => res.json())

```