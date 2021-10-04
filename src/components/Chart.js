import React, { useEffect, useState } from 'react';
import {
	Chart,
	BarElement,
	BarController,
	LinearScale,
	CategoryScale,
} from 'chart.js';

Chart.register(
	BarElement,
	BarController,
	LinearScale,
	CategoryScale,
);

import './Chart.scss'

export const BarChart = ({ data }) => {

	const [chart, setChart] = useState(null)

	useEffect(() => {
		if (!chart) return
		const ds = chart.data.datasets[0]
		ds.data = data
		chart.update();
	}, [data])

	useEffect(() => {
		var ctx = document.getElementById('bar-chart').getContext('2d');
		setChart(new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Unclaimed', 'NFT Claimed', 'Wallet Created'],
				datasets: [{
					label: '# of Votes',
					data,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		}))
	}, [])

	return <>
			<canvas id="bar-chart" width="200" height="200"></canvas>
		</>
}
