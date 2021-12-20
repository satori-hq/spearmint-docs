/// TODO handle fetch errors

export const getCall = async ({ env, appName, apiKey, path, params })=> {
	const url = new URL(`https://spearmint-${env}.near.workers.dev/v1/api/${appName}/${path}`);
	if (params) {
		for (let key in params) {
			url.searchParams.append(key, params[key])
		}
	}
	const res = await fetch(url.toString(), {
		method: 'GET',
		headers: new Headers({ authorization: `Bearer ${apiKey}` }),
	})
	return await res.json()
}