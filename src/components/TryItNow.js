import React from 'react';

const ENVS = {
	dev: 'testnet',
	testnet: 'mainnet',
	mainnet: 'dev'
}

let ENV = window.ENV = 'dev'

window.onload = () => {
	const button = document.createElement('button')
	button.textContent = ENV
	button.onclick = () => {
		ENV = window.ENV = ENVS[ENV]
		button.textContent = ENV
	}
	document.body.querySelector('.navbar__items--right').prepend(button)
}

export const TryItNow = () => {
	return <a className="custom-button table-of-contents__link" onClick={({ target }) => {

		let code = target.previousSibling.textContent;
		const matches = code.match(/\[.*?\]/gi);
		try {
			matches.forEach((match) => {
				const key = match + '-' + ENV
				let input, fromStorage = false
				switch (match) {
					case '[API_ORIGIN]':
						code = code.replace(match, `https://spearmint-${ENV}.near.workers.dev`);
						return;
					case '[YOUR_APP_NAME]':
					case '[YOUR_API_KEY]':
						const item = localStorage.getItem(key)
						if (item && window.confirm(`Use "${item}" as ${key}?`)) {
							input = item
							fromStorage = true
						}
				}
				if (!input) input = window.prompt(match)
				if (!input) throw 'return'
				switch (match) {
					case '[YOUR_APP_NAME]':
					case '[YOUR_API_KEY]':
						if (!fromStorage && window.confirm(`Save "${input}" as ${key}?`)) {
							localStorage.setItem(key, input)
						}
				}
				code = code.replace(match, input)
			});
			eval(`(async () => {
				const res = ${code.substr(0, code.length - 4)};
				if (!res.ok) {
					return alert(await res.text())
				}
				const json = await res.json()
				console.log(json)
				alert(JSON.stringify(json))
			})()`);
		} catch(e) {
			return
		}
	}}>
		Try it now!
	</a>
}