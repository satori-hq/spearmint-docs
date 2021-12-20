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

	const loadApps = async () => {
		if (!env) return;
		delete keys[env]?.__selected; // remove selected app when changing environments
		const admin = window.location.href.split('?admin=')[1];
		if (!admin) {
			setState({ apps: {} })
			return;
		}
		const apps = await getCall({ env, appName: '__SATORI_APP_ID', apiKey: admin, path: 'list' });
		for (let key in apps) {
			apps[key] = admin;
		}
		setState({ apps, types: {}, claims: {} });
	}

	const loadState = async () => {
		const key = keys[env]?.__selected;
		if (!key) {
			setState({ types: {}, claims: {} });
			return;
		} else {
			const admin = window.location.href.split('?admin=')[1];
			let { appName, apiKey } = key
			setState({ types: await getCall({ env, appName, apiKey, path: 'types', params: admin ? { admin: apiKey } : {} }) })
			setState({ claims: await getCall({ env, appName, apiKey, path: 'claims', params: admin ? { admin: apiKey } : {} }) })
		}
	}

	useEffect(loadApps, [env]);

	useEffect(loadState, [key]);

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

				<Keys adminApps={apps} />
				<EnvButton />
				<Dialog />

				<button disabled={!key} className="custom-button table-of-contents__link" onClick={loadState}>Refresh</button>

				<h2>NFT Series</h2>
				<div className="table">
					<div className="row">
						<div className="cell">Contract ID</div>
						<div className="cell">Series Title</div>
						<div className="cell">Created At</div>
						<div className="cell">UI Theme</div>
					</div>
					{
						typesArr.map(([k, v], i) => <div key={i} className="row">
							<div className="cell">{k.split('/')[0]}</div>
							<div className="cell">{k.split('/')[1]}</div>
							<div className="cell">
								{whenFormatted(v.ts)}
							</div>
							<div className="cell">
								{v.theme || 'None'}
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
					<div className="row">
						<div className="cell">Created</div>
						<div className="cell">Series ID</div>
						<div className="cell">NFT Claimed</div>
						<div className="cell">Wallet Created</div>
					</div>
					{
						claimsArr.map(([k, v], i) => {
							return <div key={i} className="row">
								<div className="cell">
									{whenFormatted(v.ts)}
								</div>
								<div className="cell">
									{v.contractId + '/' + v.title}
								</div>
								<div className="cell">
									{'nft' in v ? 'Yes' : 'No'}
								</div>
								<div className="cell">
									{'ld' in v ? 'Yes' : 'No'}
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