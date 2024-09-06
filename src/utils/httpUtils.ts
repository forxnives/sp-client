interface PostParams {
	path: string
	body: any
	token?: string
}

interface GetParams {
	path: string
	token?: string
}

const constructHeaders = (token?: string) => {
	const headers = new Headers()
	headers.append("Content-Type", "application/json")
	headers.append("Accept", "application/json")
	if (token) {
		headers.append("Authorization", token)
	}
	return headers
}

export const httpRequest = async (
	path: string,
	requestInfo: any,
	error?: Error
) => {
	const result = await fetch(`${import.meta.env.VITE_BASE_URL}${path}`, {
		...requestInfo,
	})

	if (result.ok) {
		return result.json()
	}

	if (error) throw error

	throw new Error("Failed to fetch data")
}

export const getData = async ({ path, token }: GetParams) => {
	const response = await httpRequest(path, {
		method: "GET",
		headers: constructHeaders(token),
	})
	return response
}
// export const postData = async ({ path, body, token }: PostParams) => {
// 	const response = await httpRequest(`${BASE_URL}${path}`, {
// 		method: "POST",
// 		headers: constructHeaders(token),
// 		body: JSON.stringify(body),
// 	})
// 	return response
// }

// export const putData = async ({ path, body, token }: PostParams) => {
// 	const response = await httpRequest(`${BASE_URL}${path}`, {
// 		method: "PUT",
// 		headers: constructHeaders(token),
// 		body: JSON.stringify(body),
// 	})
// 	return response
// }

// export const deleteData = async ({ path, token }: GetParams) => {
// 	const response = await httpRequest(`${BASE_URL}${path}`, {
// 		method: "DELETE",
// 		headers: constructHeaders(token),
// 	})
// 	return response
// }
