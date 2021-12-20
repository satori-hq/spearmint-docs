import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Satori from '@site/static/img/satori.svg';
import Sakura from '@site/static/img/sakura.svg';
import Spearmint from '@site/static/img/spearmint.svg';
import Arrow from '@site/static/img/arrow.svg';

import './index.scss';

function Main() {

	const [email, setEmail] = useState('')
	const [sent, setSent] = useState('')

	const post = async () => {
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

		if (!pattern.test(email)) {
			setSent('invalid email')
			setTimeout(() => setSent(''), 1500)
			return
		}

		setEmail('')
		setSent('Thank You!')

		const res = await fetch('https://docs.google.com/forms/u/2/d/e/1FAIpQLSdr96qOYZCHdroL91K-PMPmoHldBC_K5KKiXimhNHivN6ZqUQ/formResponse', {
			method: "POST",
			mode: 'no-cors',
			headers: new Headers({
				'content-type': 'application/x-www-form-urlencoded'
			}),
			body: 'entry.2091052604=' + email,
		}).then(v => v.text());
	}
	
	return (
		<div className="splash">
			<Satori />
			<br />
			<Sakura />
			<h2>Easy, Accessible NFTs</h2>
			<p>Launching early 2022</p>
			<div className='bubble'>
				<div>
					<h2>Try Spearmint, our Everything NFTs API!</h2>
					<h3>Get Started Now!</h3>
					<a href="/docs/intro"><button className='green'>Spearmint Docs</button></a>
				</div>
				<div><Spearmint /></div>
			</div>
			<div className='bubble'>
				<div>
					<h2>Sign up for news about our launch!</h2>
				</div>
				<div>

					<div>
						<input 
							disabled={sent.length > 0} type="text"
							placeholder='Your Email' value={email}
							onChange={(e) => setEmail(e.target.value)}
							onKeyUp={(e) => {
								if (e.key === 'Enter') post()
							}}
						/>
						<Arrow className={sent.length > 0 ? 'disabled' : ''} onClick={post} />
						{sent.length > 0 && sent}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />">
			<div className='background-wrap'>
				<div className='background-inner'>
					<div className='header-blobs'></div>
					<div className='footer-blobs'></div>
				</div>
			</div>
			<div className='noise'></div>

			<Main />
		</Layout>
	);
}
