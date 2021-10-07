import React from 'react';
import { EnvButton } from './EnvButton'
import BrowserOnly from '@docusaurus/BrowserOnly';

import './DialogActions'

export const TryItNow = () => {
	return <button className="custom-button table-of-contents__link" onClick={async ({ target }) => {

		if (document.querySelector('section.modal')) {
			return
		}

		let code = target.previousSibling.textContent;
		const matches = code.match(/\[.*?\]/gi);
		try {

			for (let i = 0; i < matches.length; i++) {
				const match = matches[i]
				const key = match + '-' + window.ENV
				let input, fromStorage = false
				switch (match) {
					case '[API_ORIGIN]':
						code = code.replace(match, `https://spearmint-${window.ENV}.near.workers.dev`);
						continue;
					case '[YOUR_APP_NAME]':
					case '[YOUR_API_KEY]':
						const item = localStorage.getItem(key)
						if (item && await window.confirm(`Use "${item}" as ${key}?`)) {
							input = item
							fromStorage = true
						}
				}
				if (!input) input = await window.prompt(match)
				if (!input) throw 'return'
				switch (match) {
					case '[YOUR_APP_NAME]':
					case '[YOUR_API_KEY]':
						if (!fromStorage && await window.confirm(`Save "${input}" as ${key}?`)) {
							localStorage.setItem(key, input)
						}
				}
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
		} catch(e) {
			return
		}
	}}>
		Try it now!
	</button>
}

/// TryItNow has to be first
export const TryItNowWithEnv = () => <BrowserOnly>
	<TryItNow />
	<EnvButton />
</BrowserOnly>