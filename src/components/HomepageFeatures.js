import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
	{
		title: 'Easy to Use',
		Svg: require('../../static/img/spearmint.svg').default,
		description: (
			<>
				Spearmint is easy to get registered as an app on our testnet and get started for FREE. Try it <a href="/docs/intro">right now</a>.
			</>
		),
	},
	{
		title: 'Focus on What Matters',
		Img: require('../../static/img/sakura.png').default,
		description: (
			<>
				Spearmint takes care of the crypto/blockchain for you and your users, so you can focus on building your apps.
			</>
		),
	},
	{
		title: 'Powered by NEAR',
		Svg: require('../../static/img/near_logo.svg').default,
		description: (
			<>
				Get the best speed, security and UX for your users, with some of the lowest minting costs.
			</>
		),
	},
];

function Feature({ Svg, Img, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				{Img ? <img src={Img} style={{display: 'inline-block', width: 200}} /> : <Svg className={styles.featureSvg} alt={title} />}
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
