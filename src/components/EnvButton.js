import React, { useEffect, useState, useContext } from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
import { get, set } from '../utils/storage'
import { appStore, onAppMount, isDeployed } from './../state/app';

const ENVS = {
	dev: 'testnet',
	testnet: 'mainnet',
	mainnet: isDeployed ? 'testnet' : 'dev'
}

const ENV_KEY = '__ENV_KEY'

export const EnvButton = () => {
	const { dispatch, update, state: { app: { env } } } = useContext(appStore)

	useEffect(() => {
		dispatch(onAppMount())
		update('app.env', get(ENV_KEY, 'dev'))
	}, [])

	return <button
		className="custom-button table-of-contents__link"
		onClick={() => {
			const nextEnv = ENVS[env]
			update('app.env', nextEnv)
			set(ENV_KEY, nextEnv)
		}}
	>Network: {env}</button>
}