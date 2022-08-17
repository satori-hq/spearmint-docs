---
sidebar_position: 3
---

import { TryItNowWithEnv } from '../../src/components/TryItNow'
import { Dialog } from '../../src/components/Dialog'

# Create an NFT Series

Think of a Series as your NFT project. It will define what your NFT is and the media (one or many) that its individual NFTs represent.

There are three easy steps to create a series, and we'll walk you through each of them here! Let's go! 🚀

---

👉 **Step 1: Upload your NFT media to IPFS Directory**

:::tipRead me!

**But first, some important notes about naming your media files!**

✅ The **filename** for each file within your folder **must not exceed 12 characters, including the file extension**. (This is necessary to reduce the cost of on-chain storage, and we pass these low costs on to you!)

✅ **If your series has only one media asset, the filename doesn't matter (aside from the 12-character length limitation)** - your NFTs will be minted sequentially, and the sequential number of the minted NFT will display in its title in the owner's wallet, e.g. **Lachlan's Single-Media NFT - 3/100** (where **3** is the unique number of this NFT, and **100** is the total number of copies for the series).

✅ **If your series has more than one media asset, the filename matters!** NFTs will be chosen with provable randomness, and your filename will be used in the title for individual NFTs within your series, formatted like so: **"<MY_NFT_TITLE> - <ASSET_FILENAME_WITHOUT_EXTENSION>"**. Here are a couple of examples:
**Example A)** You have a series of 10,000 with the title "BoredPunks" that contains 10,000 unique media assets. You name the media files with numbers incrementing from 1-10,000, with a preceding hash, e.g. `#1.png`, `#2.png` ... `#10000.png`. The owner of token #6789 will see the title of their NFT in their wallet as **BoredPunks - #6789**.
**Example B)** You have a series of 100 with the title "Lachlan's Lucky Draw" with 3 levels (and therefore 3 media assets), e.g. `Platinum`, `Gold` and `Silver`. You name the media asset files as such, e.g. `Platinum.png`, `Gold.png` and `Silver.png`. The owner of a Platinum NFT will see the title of their NFT in their wallet as **Lachlan's Lucky Draw - Platinum**

:::

**Enough preamble; Let's get to uploading those files! 😄** In order to support super flexible NFTs (multiple media assets at rarities you specify, any filetype you wish, extra JSON attributes, cover images... etc), we require that media is uploaded to an IPFS directory. There are two easy ways to do this using NFT.Storage:

**_Option A (no-code):_**

1. Log in to [NFT.Storage](https://nft.storage), then navigate to **API Keys** -> **+ New Key**, give your new API key a name, and click **Create**. Copy your new API key.

2. Download and install [NFTUp](https://nft.storage/blog/post/2022-04-05-announcing-nftup/) (an NFT.Storage product). You should be presented with an option to drag and drop files. We'll come back here in a moment!

3. On your local machine, create a folder that contains the assets you wish to attach to your NFT series, named according to the guidelines above. (The folder can be named whatever you like - it's the individual file names that matter! **NB: You must create a folder, even if it only contains a single file.**)

4. Drag and drop your new folder into NFTUp (you may be prompted to enter the NFT.Storage API key you created and copied in Step 1). You will be presented with the CID of your directory on IPFS. Save the CID somewhere easy to retrieve and **proceed to Step 2!** _Note: If you visit `https://ipfs.io/ipfs/<YOUR_DIRECTORY_CID>` you will see the individual files, and (as you probably guessed) you can access each file by appending a slash and the filename, e.g. `https://ipfs.io/ipfs/<YOUR_DIRECTORY_CID>/1.png` or `.../1.json` (if you are attaching additional metadata/attributes)_

**_Option B (Quick 'n' Easy JavaScript):_**

1. Create an [NFT.Storage](https://nft.storage) API Key (follow Step 1 in Option A above)

2. In your Node.js app, install the [nft.storage](https://nft.storage/docs/client/js/) JavaScript client (`yarn add nft.storage` or `npm i nft.storage`)

3. Copy and paste [this code snippet](https://nft.storage/docs/how-to/store-directory/) to upload your directory to NFT.Storage, and... upload your directory.

4. Save the CID somewhere easy to retrieve and **proceed to Step 2!**

---

👉 **Step 2: Fund your series**

💰 It costs 0.05 NEAR **per copy** to create a series. This covers the future cost to [store](https://docs.near.org/docs/concepts/storage-staking) each NFT on the NEAR blockchain when they are minted.

To calculate the cost to create your series, **multiply your total copies (total NFT supply for this series) by 0.05**, and that is the amount of NEAR that is required to create your series - no more, no less! So if you are creating a series with 10 copies, you should transfer 0.5N (`0.05 x 10 = 0.5`), or if you are creating a total supply of 100 copies in your series, you should transfer 5N (`0.05 x 100 = 5`). You get the idea! 🤓

When you have determined the exact cost in NEAR, go to the [NEAR wallet](https://wallet.testnet.near.org), create an account if you don't already have one, and transfer this exact amount of NEAR to `snft.testnet`. When you've made the transfer, **copy the transaction hash** of your funding transfer and come back here to proceed!

:::tip

🚨 You must transfer the **exact amount** of NEAR required for your NFT series, calculated as the **total copies \* 0.05**. If you transfer more or less than this amount, the series creation will fail, and you will not be refunded!

:::

---

👉 **Step 3: Create your series!**

The following 9 items will need to be sent with your request in order to create your series:

1️⃣ **`contractId`** (required) - the Contract ID for your collection. If you don't have this, go [fetch your collections](http://localhost:3001/docs/quickstart/create-collection#fetching-collections), then come back here.

2️⃣ **`title`** (required) - the title of your NFT series, e.g. "Lachlan's NFT Project"

3️⃣ **`description`** (optional) - a description for your NFT series (this will be identical across all NFTs in your series)

4️⃣ **`mediaCid`** (required) - the CID of the IPFS directory you created in Step 1

5️⃣ **`copies`** (required) - the total number of copies that are available to be minted for this NFT series (this should be the same number you used to calculate the cost of your series in Step 2)

6️⃣ **`royalty`** (optional) - see instructions below to create a series with royalties

7️⃣ **`assets`** (required) - an array of sub-arrays. Each sub-array should contain exactly three elements in the following order:

**1.** `MEDIA_ASSET_FILENAME` (string): the filename of this media asset, e.g. `"1.png"`, located inside the IPFS directory specified in `mediaCid`

**2.** `MEDIA_ASSET_TOTAL_SUPPLY` (number): the total supply for this media asset, e.g. `10`

**3.** `EXTRA_ASSET_FILENAME` (string): the filename for an extra file (e.g. JSON attributes) to provide more information on the media asset, e.g. `"1.json"`, located inside the IPFS directory specified in `mediaCid`. _NB: if no extra file is available, this element should be an empty string._

**Examples:**

1. `assets` for an NFT series of 100 copies with two assets distributed at varying degrees of rarity, without accompanying extra/JSON file: `[["Gold.png", 10, ""],["Silver.png", 90, ""]]`

2. `assets` for an NFT series of 5 copies with 5 assets and accompanying extra/JSON files: `[["#1.png", 1, "1.json"],["#2.png", 1, "2.json"],["#3.png", 1, "3.json"],["#4.png", 1, "4.json"],["#5.png", 1, "5.json"]]`

8️⃣ **`coverAsset`** (required): the filename of a media asset located inside the IPFS directory specified in `mediaCid` which can be used as a cover media asset across all NFTs in your series if required, e.g. `cover.png`. _NB: this can be the same filename as one of the media asset filenames specified in `assets`_

9️⃣ **`funding-hash`** (required): the transaction hash from your NEAR Wallet transaction in Step 2. _NB: This is sent in `funding-hash` header._

:::tip

1. Only one media asset can be uploaded using the _Try It Now_ button below, but you can add as many assets as you'd like in your own calls!

2. When you create a series, the template for that series is added to the deployed Smart Contract. Because this involves a state change on the NEAR blockchain, the request will take a couple seconds to return - just like when you created your Collection.

3. An NFT series can be created with or without royalties, as you wish. To specify royalties for your NFT series, include optional **`royalty`** property in your request body.

**`royalty`** can contain up to 9 entries in the format `[ACCOUNT_ID]: [ROYALTY_AMOUNT]`. All Account IDs must be valid (existing) accounts.

**`ROYALTY_AMOUNT`** should be calculated as **percentage points \* 100**. E.g. 10% == `1000` or 1% == `100`.

_NB: A Satori royalty of 2.5% will be added to all NFT series._

:::

_NB: `description` property is optional_

#### Example Request:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series`, {
  method: `POST`,
  headers: new Headers({
    authorization: `Bearer [YOUR_API_KEY]`,
    "funding-hash": `[YOUR_FUNDING_HASH]`,
  }),
  body: JSON.stringify({
    contractId: `[CONTRACT_ID]`,
    title: `[SERIES_TITLE]`,
    description: `[NFT_DESCRIPTION]`,
    copies: [NUMBER_OF_COPIES],
    mediaCid: `[IPFS_DIRECTORY_CID]`,
    assets: [
      [
        `[MEDIA_ASSET_FILENAME]`,
        [MEDIA_ASSET_TOTAL_SUPPLY],
        `[EXTRA_ASSET_FILENAME]`,
      ],
    ],
    coverAsset: `[COVER_MEDIA_ASSET_FILENAME]`,
    royalty: {
      [ACCOUNT_ID]: [ROYALTY_AMOUNT],
    },
  }),
});
```

<TryItNowWithEnv />

#### Example Responses by Status Code:

`200` (success):

```js
/*

For more information on FinalExecutionOutcome shape, please visit https://near.github.io/near-api-js/interfaces/providers_provider.finalexecutionoutcome.html

*/

{
  contractId: string; // the contract ID for the collection that the series was created within
  title: string; // the title of your newly created NFT series
  nftResponse: FinalExecutionOutcome; // the outcome of the Create Series function call on your NFT contract
  fundingResponse: FinalExecutionOutcome; // the outcome of the the transaction where we forwarded the funds to your NFT contract
}
```

`400`, `401`, `403` (validation error):

```js
/*

More info on status codes:
- 400 implies that the funding-hash provided in your request header can be reused
- 401 implies that the credentials (API key) you provided do not match our records for your account
- 403 implies that the funding-hash you provided has previously been used and thus cannot be reused

*/

{
  error: string; // a descriptive error string indicating what went wrong in your request and how to resolve the validation error
}
```

`500` (internal error):

```js
/*

A 500 response code implies that your request was formatted correctly and the funding-hash provided in your request header was valid, but there was an internal error completing your request.

The funding-hash cannot be re-used, but we will have refunded the funds to the NEAR account that funded the initial transaction.

*/

{
  error: {
    message: string; // a descriptive error string indicating what went wrong in your request
    refundHash?: string; // transaction hash for the refund transaction
    refundError?: string // in the very unlikely event that we were unable to process your refund, those details will be provided here. If you encounter this property, please reach out to us at support@satori.art.
  };
}
```

#### FETCHING ALL SERIES

In the next section, you will use your NFT `[SERIES_ID]` to generate a claim link. You can get a list of your series below.

The response will be a set of Series IDs in the format `{ [SERIES_ID]: [SERIES_DATA], ... }`.

`SERIES_ID` is constructed as follows: `[CONTRACT_ID]/[SERIES_TITLE]`.

Example response:

```js
{"lachlans-collection.snft.testnet/My First Series":{"ts":1637199109816}}
// The Series ID is: lachlans-collection.snft.testnet/My First Series
```

#### Example Request:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series`, {
  method: `GET`,
  headers: new Headers({ authorization: `Bearer [YOUR_API_KEY]` }),
});
```

<TryItNowWithEnv />

#### Example Responses by Status Code:

`200` (success):

```js
/*

An object where the keys are your series IDs, and the values are in the following shape:

{
  ts: number // the timestamp when your NFT series was created
}

E.g.:

{

  "lachlans-collection.snft.testnet/My NFT Series": {

    "ts":1637199109816

  },

  ...

}

*/
```

`401` (validation error): the credentials (API key) you provided do not match our records for your account.

#### FETCHING A SINGLE SERIES

You can fetch a single series by its ID for more information on the series, such as `totalMinted`, `totalAvailable`, `royalties` and `metadata` (`title`, `description`, `media`, `copies`).

:::tip
Be sure to URL-encode the series ID, as it includes a `/`!
:::

#### Example Request:

```js
await fetch(`[API_ORIGIN]/v1/api/[YOUR_APP_NAME]/series/[SERIES_ID]`, {
  method: `GET`,
  headers: new Headers({
    authorization: `Bearer [YOUR_API_KEY]`,
  }),
});
```

<TryItNowWithEnv />

#### Example Responses by Status Code:

`200` (success):

```js
{
  contractId: string // the contract ID for the collection that this series exists within
  seriesId: string // the series ID for your NFT series (formatted as contractId + '/' + seriesTitle)
  copiesMinted: number // the number of NFTs that have been minted on this series
  copiesRemaining: number // the number of NFTs that are available to be minted on this series (can be calculated manually as metadata.copies - copiesMinted)
  metadata: {
    title: string // series title
    copies: number // total copies for series
    description: string | null // series description
    media: string // series media reference (append to https://ipfs.io/ipfs/ to construct full media URL)
  }
  royalties: Record<AccountId, number> // royalties for this NFT series, which will be paid out in the event of a secondary sale on a marketplace that supports the NEAR NFT royalty/payout standard.
}
```

`401` (validation error): the credentials (API key) you provided do not match our records for your account.

`404` (not found): the series ID you provided could not be found.

`500` (server error): an internal error was encountered while trying to fetch your series.

```js
{
  error: {
    message: string; // a descriptive error string indicating what went wrong in your request
  }
}
```

<Dialog />
