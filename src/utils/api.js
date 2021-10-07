

/// TODO handle fetch errors

export const getCall = async ({ appName, apiKey, path })=> {
	const res = await fetch(`https://spearmint-${window.ENV || 'dev'}.near.workers.dev/v1/api/${appName}/${path}`, {
		method: 'GET',
		headers: new Headers({ authorization: `Bearer ${apiKey}` }),
	})
	return await res.json()
}