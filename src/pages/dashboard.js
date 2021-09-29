import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { YOUR_APP_NAME, YOUR_API_KEY } from '../config'
import { get, set } from '../utils/storage'
import './dashboard.scss'

import { TryItNow } from '../../src/components/TryItNow'

import { getCall } from './api'

function Dashboard() {

	const [state, _setState] = useState({
		isApiKeyShown: false,
		appName: '',
		apiKey: '',
		types: {},
		claims: {},
	})
	const setState = (newState) => _setState((state) => ({ ...state, ...newState }))

	const init = async () => {
		const appName = get(YOUR_APP_NAME)
		const apiKey = get(YOUR_API_KEY)
		setState({ appName, apiKey })
		loadState({ appName, apiKey })
	}
	useEffect(init, [])

	const loadState = async ({ appName, apiKey }) => {
		setState({ types: await getCall({ appName, apiKey, path: 'types' }) })
		setState({ claims: await getCall({ appName, apiKey, path: 'claims' }) })
	}

	const updateAppDetails = () => {
		const { appName, apiKey } = state
		set(YOUR_APP_NAME, appName)
		set(YOUR_API_KEY, apiKey)
		loadState({ appName, apiKey })
	}

	const {
		isApiKeyShown, appName, apiKey,
		claims, types,
	} = state
	const claimsArr = Object.entries(claims)
	const typesArr = Object.entries(types)

	return (
		<Layout title="Hello">
			<section>
				<h2>App Details</h2>
				<div className="table">
					<div className="row">
						<div className="cell">App Name</div>
						<div className="cell padding-0">
							<input value={appName} onChange={(e) => setState({ appName: e.target.value })} />
						</div>
					</div>
					<div className="row">
						<div className="cell">Api Key</div>
						<div className="cell padding-0">
							<input type={isApiKeyShown ? 'text' : 'password'} value={apiKey} onChange={(e) => setState({ apiKey: e.target.value })} />
						</div>
					</div>
				</div>
				<button onClick={() => updateAppDetails()}>Update App Details</button>
				<button onClick={() => setState({ isApiKeyShown: !isApiKeyShown })}>{isApiKeyShown ? 'Hide' : 'Show'} API Key</button>
				
				<h2>NFT Claims</h2>
				<div className="table">
					{
						claimsArr.map(([k, v], i) => <div key={i} className="row">
							<div className="cell">{k}</div>
							<div className="cell">{JSON.stringify(v)}</div>
						</div>)
					}
				</div>

				<h2>NFT Series</h2>
				<div className="table">
					{
						typesArr.map(([k, v], i) => <div key={i} className="row">
							<div className="cell">{k}</div>
							<div className="cell">{JSON.stringify(v)}</div>
						</div>)
					}
				</div>
			</section>
		</Layout>
	);
}

export default Dashboard;