import React, { useContext } from 'react';
import { EnvButton } from './EnvButton'
import { Keys } from './Keys'
import { appStore } from './../state/app';

import './DialogActions'

const allowNoInput = [
	'[NFT_DESCRIPTION]'
]

export const TryItNow = () => {
	const { state: { app: { env, keys } } } = useContext(appStore)
	const key = keys.getKey()

	return <button
		className="custom-button table-of-contents__link"
		disabled={!key || (env === 'mainnet' && !/ENV=mainnet/.test(window.location.href))}
		onClick={async ({ target }) => {

			const { appName, apiKey } = key

			if (document.querySelector('section.modal')) {
				return
			}

			let code = target.previousSibling.textContent;
			const matches = code.match(/\[.*?\]/gi);
			try {

				for (let i = 0; i < matches.length; i++) {
					const match = matches[i]
					let input
					switch (match) {
						case '[API_ORIGIN]':
							code = code.replace(match, `https://spearmint-${env}.near.workers.dev`);
							continue;
						case '[YOUR_APP_NAME]': input = appName
						break;
						case '[YOUR_API_KEY]': input = apiKey
						break;
					}
					if (!input) input = await window.prompt(match)
					if (!input && !allowNoInput.includes(match)) throw 'return'
					code = code.replace(match, input)
				}

				eval(`(async () => {
				const res = ${code.substr(0, code.length - 4)};
				let ret
				if (!res.ok) {
					ret = await res.text()
				} else {
					ret = await res.json()
				}
				console.log(ret)
				ret = JSON.stringify(ret)
				if (ret.length > 512) {
					return alert('Response too large. Outputted to JS console.')
				}
				alert(ret)
			})()`);
			} catch (e) {
				return
			}
		}}>
		Try it now!
	</button>
}

/// TryItNow has to be first
export const TryItNowWithEnv = ({ hideKeys = false }) => <>
	<TryItNow />
	{ !hideKeys && <Keys /> }
	<EnvButton />
</>