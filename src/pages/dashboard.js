import React, { useEffect, useState, useContext, useMemo } from 'react';
import Layout from '@theme/Layout';

import { appStore } from './../state/app';
import { getCall } from '../utils/api'
import { EnvButton } from '../../src/components/EnvButton'
import { Keys } from '../../src/components/Keys'
import { Dialog } from '../../src/components/Dialog'
import { whenFormatted } from '../utils/date'
import { arrayToCsv, downloadBlob } from '../utils/csv'
import './dashboard.scss'

import { BarChart } from './../components/Chart'
import './../components/DialogActions'

function Dashboard() {
	const { state: { app: { env, keys } } } = useContext(appStore)
	const key = keys[env]?.__selected

	const [state, _setState] = useState({
		types: {},
		claims: {},
	})
	const setState = (newState) => _setState((state) => ({ ...state, ...newState }))

	const searchParams = new URLSearchParams(window.location.search);
	const admin = searchParams.get('admin');

	const loadApps = async () => {
		if (!admin) {
			setState({ apps: {} })
			return;
		}
		const apps = await getCall({ env, appName: '__SATORI_APP_ID', apiKey: admin, path: 'list' });
		for (let key in apps) {
			apps[key] = admin;
		}
		setState({ apps })
	}

	const loadState = async () => {
		if (!key) return
		let { appName, apiKey } = key
		setState({ types: await getCall({ env, appName, apiKey, path: 'types', params: admin ? { admin: apiKey } : {} }) })
		setState({ claims: await getCall({ env, appName, apiKey, path: 'claims', params: admin ? { admin: apiKey } : {} }) })
	}

	useEffect(() => {
		loadApps();
		loadState();
	}, [])

	const {
		claims, types, apps,
	} = state;

	const [claimsArr, claimsData] = useMemo(() => {
		const arr = claims.error ? [] : Object.entries(claims);
		arr.sort(([k1, a], [k2, b]) => {
			if (!a.ts) a.ts = parseInt(k1.split('/')[0], 10)
			if (!b.ts) b.ts = parseInt(k2.split('/')[0], 10)
			return b.ts - a.ts
		});
		const data = [0, 0, 0]
		arr.forEach(([k, { nft, ld }]) => {
			if (!nft && !ld) data[0]++;
			if (nft) data[1]++;
			if (ld) data[2]++;
		})
		return [arr, data];
	}, [claims]);

	const typesArr = useMemo(() => {
		return types.error ? [] : Object.entries(types);
	}, [types])

	return (
		<Layout title="Hello">
			<section>
				<h2>App Details</h2>

				<Keys
				adminApps={apps}
				onChange={loadState}
				/>
				<EnvButton onChange={loadApps} />
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
				<button
					className="custom-button table-of-contents__link"
					onClick={() => {
						const rows = [['Unclaimed', 'NFT Claimed', 'Wallet Created']];
						rows.push(claimsData);
						downloadBlob(arrayToCsv(rows), `summary-${key.appName}-${Date.now()}.csv`, 'text/csv;charset=utf-8;')
					}}
				>Download CSV</button>
				<BarChart data={claimsData} />

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

export default Dashboard;