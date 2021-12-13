
if (typeof window === 'undefined') {
    window = {}
}

if (!window.SET_DIALOG_ACTIONS) {
	window.SET_DIALOG_ACTIONS = true

	const resetDialog = async() => {
		await new Promise((resolve) => setTimeout(resolve, 60))
	}

	window.alert = async (msg) => {
		await resetDialog()
		window.DIALOG = {
			msg,
			resolve: () => {}
		}
	}

	window.confirm = async (msg) => {
		await resetDialog()
		const result = await new Promise((resolve, reject) => {
			window.DIALOG = {
				msg,
				resolve,
				reject,
				choices: [ 'OK', 'Cancel']
			}
		})
		return result === 'OK'
	}

	window.prompt = async (msg) => {
		await resetDialog()
		const [singleResult] = await new Promise((resolve, reject) => {
			window.DIALOG = {
				msg,
				resolve,
				reject,
				input: [
					{placeholder: msg},
				]
			}
		})
		// if (!regex.test(singleResult)) {
		// 	window.alert()
		// }
		return singleResult ? singleResult.trim() : singleResult;
	}

	window.select = async (msg, choices) => {
		await resetDialog()
		const result = await new Promise((resolve, reject) => {
			window.DIALOG = {
				msg,
				resolve,
				reject,
				choices
			}
		})
		return result
	}
}