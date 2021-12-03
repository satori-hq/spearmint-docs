import React, { useEffect, useState, useContext } from 'react';
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

const adminLabels = ['Unclaimed', 'NFT Claimed', 'Wallet Created']

function Dashboard() {
	const { state: { app: { env, keys } } } = useContext(appStore)
	const key = keys[env]?.__selected
	const { appName, apiKey } = key || { appName: 'test', apiKey: 'NA' }

	const url = new URL(window?.location?.href || 'https://satori.art')
	const isAdmin = url.searchParams.get('admin')

	const [state, _setState] = useState({
		types: { appName: {} },
		claims: { appName: {} },
	})
	const setState = (newState) => _setState((state) => ({ ...state, ...newState }))

	const loadState = async () => {
		if (!key) return

		if (isAdmin) {
			setState({
				types: await getCall({ env, appName: '__SATORI_APP_ID', apiKey, path: 'all-types' + url.search }),
				claims: await getCall({ env, appName: '__SATORI_APP_ID', apiKey, path: 'all-claims' + url.search })
			})
			return
		}
		setState({
			types: await getCall({ env, appName, apiKey, path: 'types' }),
			claims: await getCall({ env, appName, apiKey, path: 'claims' })
		})
	}
	useEffect(loadState, [])

	const handleDownload = async (claims) => {
		const ret = [[
			'App Name', 'NFT Title', 'Unclaimed', 'NFT Claimed', 'Wallet Created'
		]]
		for (let i = 0; i < claims.length; i++) {
			const { key, data } = claims[i]
			const series = Object.entries(data).map(([k, v]) => ([k, ...v]))
			if (series.length > 0) {
				ret.push(...series.map(([title, ...data]) => ([key, title, ...data])))
			} else {
				ret.push([key])
			}
		}
		downloadBlob(arrayToCsv(ret), 'data.csv', 'text/csv;charset=utf-8;')
	}

	/// formatting claims

	let {
		claims, types,
	} = state

	if (!isAdmin) {
		claims = { [appName]: claims }
		types = { [appName]: types }
	}

	let claimsAppArr = Object.entries(claims)
	let typesAppArr = Object.entries(types)

	claimsAppArr.forEach(([key, val], i) => {
		typesAppArr[i] = { key: typesAppArr[i][0], data: Object.entries(typesAppArr[i][1]) }

		let claimsArr = Object.entries(val)

		if (types.error || claims.error) {
			typesAppArr[key] = []
			claimsArr = []
		}

		claimsArr.sort(([k1, a], [k2, b]) => {
			if (!a.ts) a.ts = parseInt(k1.split('/')[0], 10)
			if (!b.ts) b.ts = parseInt(k2.split('/')[0], 10)
			return b.ts - a.ts
		})

		/// TODO in API
		const data = {}
		claimsArr.forEach(([, { contractId, title, nft, ld }]) => {
			const seriesId = `${contractId}/${title}`
			if (!data[seriesId]) data[seriesId] = [0, 0, 0]
			if (!nft && !ld) data[seriesId][0]++;
			if (nft) data[seriesId][1]++;
			if (ld) data[seriesId][2]++;
		})

		claimsAppArr[i] = { key, claimsArr, data }
	})
	console.log(claimsAppArr)
	console.log(typesAppArr)

	return (
		<Layout title="Hello">
			<section>
				<h2>App Details</h2>

				<Keys />
				<EnvButton />
				<Dialog />

				<button disabled={!key} className="custom-button table-of-contents__link" onClick={loadState}>Refresh</button>

				{
					!isAdmin ? <>
						{
							typesAppArr.map(({ key, data }) => <div key={key}>
								<h2>{decodeURIComponent(key)} NFT Series</h2>
								<div className="table">
									{
										data.map(([k, v], i) => <div key={i} className="row">
											<div className="cell">{k}</div>
											<div className="cell">
												{JSON.stringify(v)}
											</div>
										</div>)
									}
								</div>
							</div>)
						}
						{
							claimsAppArr.map(({ key, claimsArr, data }) => <div key={key}>
								<h2>{decodeURIComponent(key)} Claim Links</h2>
								<BarChart data={data} />
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
							</div>)
						}

					</> :
						<>
							<button className="custom-button table-of-contents__link" onClick={() => handleDownload(claimsAppArr)}>Download CSV</button>

							{
								claimsAppArr.map(({ key, claimsArr, data }) => <div key={key}>
									<h2>{decodeURIComponent(key)}</h2>
									{
										Object.entries(data).map(([k, v], i) => <div key={k}>
											<h4>{k}</h4>
											{ v.map((v, i) => <p key={i}>{adminLabels[i]} - {v}</p>)}
										</div>)
									}
								</div>)
							}
						</>
				}


			</section>
		</Layout>
	);
}

export default Dashboard