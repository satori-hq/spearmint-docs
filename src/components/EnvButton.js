import React, { useEffect, useState } from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
import { get, set } from '../utils/storage'

const ENVS = {
	dev: 'testnet',
	testnet: 'mainnet',
	mainnet: 'dev'
}

const ENV_KEY = '__ENV_KEY'

export const EnvButtonInner = () => {
	
	if (!window.ENV) {
		const ENV = get(ENV_KEY, null) || 'dev'
		window.ENV = ENV
	}
	let interval, _env = 'dev'
	
	const [env, setEnv] = useState('dev')

	/// some lazy shit with intervals and global window state, they clear when unmounted
	useEffect(() => {
		interval = setInterval(() => {
			if (window.ENV !== _env) {
				_env = window.ENV
				setEnv(_env)
				set(ENV_KEY, _env)
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


export const EnvButton = () => <BrowserOnly>
	{() => {
        return <EnvButtonInner />
      }}
</BrowserOnly>