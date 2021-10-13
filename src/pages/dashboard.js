import React, { useEffect, useState, useContext } from 'react';
import Layout from '@theme/Layout';

import { appStore } from './../state/app';
import { getCall } from '../utils/api'
import { EnvButton } from '../../src/components/EnvButton'
import { Keys } from '../../src/components/Keys'
import { Dialog } from '../../src/components/Dialog'
import { whenFormatted } from '../utils/date'
import './dashboard.scss'

import { BarChart } from './../components/Chart'
import './../components/DialogActions'

function Dashboard() {
	const { state: { app: { env, keys } } } = useContext(appStore)
	const key = keys[env]?.__selected

	console.log(key)

	const [state, _setState] = useState({
		types: {},
		claims: {},
	})
	const setState = (newState) => _setState((state) => ({ ...state, ...newState }))

	const loadState = async () => {
		if (!key) return
		const { appName, apiKey } = key
		setState({ types: await getCall({ env, appName, apiKey, path: 'types' }) })
		setState({ claims: await getCall({ env, appName, apiKey, path: 'claims' }) })
	}
	useEffect(loadState, [])

	const {
		claims, types,
	} = state

	let claimsArr = Object.entries(claims)
	let typesArr = Object.entries(types)
	if (types.error || claims.error) {
		typesArr = []
		claimsArr = []
	}

	claimsArr.sort(([k1, a], [k2, b]) => {
		if (!a.ts) a.ts = parseInt(k1.split('/')[0], 10)
		if (!b.ts) b.ts = parseInt(k2.split('/')[0], 10)
		return b.ts - a.ts
	})

	/// TODO in API
	const data = [0, 0, 0]
	claimsArr.forEach(([k, { nft, ld }]) => {
		if (!nft && !ld) data[0]++;
		if (nft) data[1]++;
		if (ld) data[2]++;
	})


	return (
		<Layout title="Hello">
			<section>
				<h2>App Details</h2>

				<Keys />
				<EnvButton />
				<Dialog />

				<button disabled={!key} className="custom-button table-of-contents__link" onClick={loadState}>Refresh</button>

				<h2>NFT Series</h2>
				<div className="table">
					{
						typesArr.map(([k, v], i) => <div key={i} className="row">
							<div className="cell">{k}</div>
							<div className="cell">
								{JSON.stringify(v)}
							</div>
						</div>)
					}
				</div>

				<h2>Summary</h2>
				<BarChart data={data} />

				<h2>Claim Links</h2>
				<div className="table">
					{
						claimsArr.slice(0, 100).map(([k, v], i) => {
							const { ts } = v
							return <div key={i} className="row">
								<div className="cell">
									Created: {whenFormatted(ts)}
								</div>
								<div className="cell">
									{JSON.stringify(v)}
								</div>
							</div>
						})
					}
				</div>

			</section>
		</Layout>
	);
}

export default Dashboard