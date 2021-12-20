import React, { useEffect, useState, useContext } from 'react';

import { get, set } from '../utils/storage'
import { appStore } from './../state/app';

const KEYS_KEY = '__KEYS_KEY'

export const Keys = ({ adminApps }) => {
	const { dispatch, update, state: { app: { env, keys } } } = useContext(appStore)
	let keysEnv = keys[env] || {}
	if (adminApps) keysEnv = adminApps;
	
	useEffect(() => {
		update('app.keys', {
			...get(KEYS_KEY),
		})
	}, [])

	return <>
		<button
			className="custom-button table-of-contents__link"
			onClick={async () => {
				const selected = await window.select('Select or Set Up an App',[
					...Object.keys(keysEnv).filter((k) => k.indexOf('__') !== 0).map((k) => 'App: ' + k),
					'Add',
					'Remove'
				])
				switch (selected) {
					case 'Add': {
						const appName = await window.prompt('App Name for Key?');
						const apiKey = await window.prompt('Api Key for ' + appName + '?');
						keysEnv[appName] = apiKey
						keysEnv.__selected = { appName, apiKey }
						const newKeys = { ...keys, [env]: keysEnv }
						set(KEYS_KEY, newKeys)
						update('app.keys', newKeys)
						return
					}
					case 'Remove': {
						const appName = await window.prompt('Remove key for what app name?');
						delete keysEnv[appName]
						if (keysEnv.__selected.appName === appName) {
							keysEnv.__selected = null
						}
						const newKeys = { ...keys, [env]: keysEnv }
						set(KEYS_KEY, newKeys)
						update('app.keys', newKeys)
						return
					}
					default: {
						const appName = selected.split('App: ')[1]

						if (!keysEnv[appName]) {
							return window.alert('App does not exist')
						}
						keysEnv.__selected = { appName, apiKey: keysEnv[appName] }
						const newKeys = { ...keys, [env]: keysEnv }
						if (!adminApps) set(KEYS_KEY, newKeys) // don't set on local storage if this is an admin user switching between apps
						update('app.keys', newKeys)
						return
					}
				}
			}}
		>{ keysEnv.__selected ? 'App: ' + keysEnv.__selected.appName : 'No App Selected' }</button>
	</>
}