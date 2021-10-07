import React, { useEffect, useState } from 'react';

const ENVS = {
	dev: 'testnet',
	testnet: 'mainnet',
	mainnet: 'dev'
}

if (typeof window === 'undefined') {
    window = {}
}
window.ENV = 'dev'

export const EnvButton = () => {
	let interval, _env = 'dev'

	const [env, setEnv] = useState('dev')

	/// some lazy shit with intervals and global window state, they clear when unmounted
	useEffect(() => {
		interval = setInterval(() => {
			
			if (window.ENV !== _env) {
				_env = window.ENV
				setEnv(_env)
			}
		}, 50)
		return () => {
			clearInterval(interval)
		}
	}, [])

	return <button
		className="custom-button table-of-contents__link"
		onClick={() => {
			window.ENV = ENVS[env]
			setEnv(window.ENV)
		}}
	>Network: {env}</button>
}
