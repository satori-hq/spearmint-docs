import React, { useEffect, useContext } from 'react';

import { get, set } from '../utils/storage'
import { appStore } from './../state/app';

const ENVS = {
	dev: 'testnet',
	testnet: 'mainnet',
	mainnet: 'dev'
}

const ENV_KEY = '__ENV_KEY'

export const EnvButton = () => {
	const { dispatch, update, state: { app: { env } } } = useContext(appStore)

	useEffect(() => {
		update('app.env', get(ENV_KEY, 'testnet'))
	}, [])

	return <button
		className="custom-button table-of-contents__link"
		onClick={() => {
			let nextEnv = ENVS[env]
			if (nextEnv === 'dev' &&  window.location.href.indexOf('spearmint') > -1) nextEnv = 'testnet'
			update('app.env', nextEnv)
			set(ENV_KEY, nextEnv)
		}}
	>Network: {env}</button>
}