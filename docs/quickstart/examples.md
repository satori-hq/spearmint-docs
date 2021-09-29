---
sidebar_position: 99
---

```
/// Example

await fetch(`[API_ORIGIN]/v1/api/test/collection`, {
	method: 'POST',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		title: 'My Sample NFT Title 🥰🔥🚀'
	})
})
```

## Create an NFT Type (series)

```
/// Example

await fetch(`[API_ORIGIN]/v1/api/test/type`, {
	method: 'POST',
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
})

```

## Create a Claim

```
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/claim`, {
	method: 'POST',
	headers: new Headers({ authorization: 'Bearer [YOUR_API_KEY]' }),
	body: JSON.stringify({
		contractId: [NFT_CONTRACT_ID],
		title: [NFT_TYPE]
	})
})

/// Example

await fetch(`[API_ORIGIN]/v1/api/test/claim`, {
	method: 'POST',
	headers: new Headers({ authorization: 'Bearer 4jNUIXJhsTYnHUGqbSiWv' }),
	body: JSON.stringify({
		contractId: 'test2.snft.testnet',
		title: 'test'
	})
})
```

## Manually Claim the Linkdrop

```
/// Example

await fetch(`[API_ORIGIN]/v1/claim/body-code/linkdrop`, {
	method: 'POST',
	body: JSON.stringify({
		code: 'VW5lW7-oR5bgPZCibOLyP',
		redirectUrl: encodeURIComponent(window.location.href)
	})
})
```

## Manually Claim the NFT

```

/// Example

await fetch(`[API_ORIGIN]/v1/claim/body-code/nft`, {
	method: 'POST',
	body: JSON.stringify({
		code: 'VW5lW7-oR5bgPZCibOLyP',
		receiverId: 'spearmint2.testnet'
	})
})

```