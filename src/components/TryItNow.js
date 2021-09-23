import React from 'react';

export const TryItNow = () => {
	return <a className="custom-button table-of-contents__link" onClick={({ target }) => {
		let code = target.previousSibling.textContent;
		const matches = code.match(/\[.*?\]/gi);
		try {
			matches.forEach((match) => {
				let input, fromStorage = false
				switch (match) {
					case '[YOUR_APP_NAME]':
					case '[YOUR_API_KEY]':
						const item = localStorage.getItem(match)
						if (item && window.confirm(`Use "${item}" as ${match}?`)) {
							input = item
							fromStorage = true
						}
				}
				if (!input) input = window.prompt(match)
				if (!input) throw 'return'
				switch (match) {
					case '[YOUR_APP_NAME]':
					case '[YOUR_API_KEY]':
						if (!fromStorage && window.confirm(`Save "${input}" as ${match}?`)) {
							localStorage.setItem(match, input)
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