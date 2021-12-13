import React, { useContext } from 'react';
import { EnvButton } from './EnvButton'
import { Keys } from './Keys'
import { appStore } from './../state/app';

import './DialogActions'

const allowNoInput = [
	'[NFT_DESCRIPTION]',
]

export const TryItNow = ({ requiresKeys }) => {

	const { state: { app: { env, keys } } } = useContext(appStore)
	const key = keys[env]?.__selected

	return <button
		className="custom-button table-of-contents__link"
		disabled={(!key && requiresKeys) || (env === 'mainnet' && !/ENV=mainnet/.test(window.location.href))}
		onClick={async ({ target }) => {

			const { appName, apiKey } = requiresKeys ? key : {}

			if (document.querySelector('section.modal')) {
				return
			}

			let code = target.previousSibling.textContent;

			const matches = code.match(/\[.*?\]/gi).filter((m) => m.length > 2);

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
					const tag = !allowNoInput.includes(match) ? ' (required)' : '';
					if (!input) input = await window.prompt(match + tag)
					if (!input && !allowNoInput.includes(match)) {
						i--;
						continue;
					}
					if (input && match === '[ACCOUNT_ID]') input = '"' + input + '"' // ACCOUNT_ID has dots, potentially dashes, and will become object property - so needs to be wrapped in quotes
					code = code.replace(match, input)
				}

				eval(`(async () => {
					const res = ${code.substr(0, code.length - 4)};
					let ret
					switch (res.ok) {
						case true: ret = await res.json(); break;
						case false: ret = await res.text(); break;
						case undefined: ret = res; break;
					}
					console.log(ret)
					ret = JSON.stringify(ret)
					if (ret.length > 512) {
						return alert('Response too large. Outputted to JS console.')
					}
					alert(ret)
				})()`);
			} catch (e) {
				console.log('e line 73: ', e)
				return
			}
		}}>
		Try it now!
	</button>
}

/// TryItNow has to be first
export const TryItNowWithEnv = ({ requiresKeys = true }) => <>
	<TryItNow {...{requiresKeys}} />
	{ requiresKeys && <Keys /> }
	<EnvButton />
</>