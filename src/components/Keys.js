import React, { useEffect, useState, useContext } from 'react';

import { get, set } from '../utils/storage'
import { appStore } from './../state/app';

const KEYS_KEY = '__KEYS_KEY'

export const Keys = () => {
	const { dispatch, update, state: { app: { env, keys } } } = useContext(appStore)
	const keysEnv = keys[env] || {}

	useEffect(() => {
		update('app.keys', get(KEYS_KEY))
	}, [])

	const getKey = () => keysEnv.__selected ? { appName: [keysEnv.__selected], apiKey: keysEnv[keysEnv.__selected] } : null
	useEffect(() => {
		update('app.keys', { getKey })
	}, [keysEnv])

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
						set(KEYS_KEY, { ...keys, [env]: keysEnv })
						return
					}
					case 'Remove': {
						const appName = await window.prompt('Remove key for what app name?');
						delete keysEnv[appName]
						set(KEYS_KEY, { ...keys, [env]: keysEnv })
						return
					}
					default: {
						const appName = selected.split('App: ')[1]
						if (!keysEnv[appName]) {
							return window.alert('App does not exist')
						}
						keysEnv.__selected = appName
						set(KEYS_KEY, { ...keys, [env]: keysEnv })
						return
					}
				}
			}}
		>{ keysEnv.__selected ? 'App: ' + keysEnv.__selected : 'No App Selected' }</button>
	</>
}