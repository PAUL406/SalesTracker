export const helpHttp = () => {
	const customFetch = async (endpoint: string, options: Record<string, any>) => {
		const defaultHeader = {
			accept: "application/json",
		};
		const controller = new AbortController();
		options.signal = controller.signal;
		options.method = options.method || "GET"; //  "falsy" ( null, undefined, 0, "", false, etc.)
		// options.method ?? "get" //null or undefined
		options.header = options.header ? { ...defaultHeader, ...options.header } : defaultHeader;

		options.body = JSON.stringify(options.body) || false;

		if (!options.body) delete options.body;

		console.log(options);

		setTimeout(() => controller.abort(), 10000);
		return fetch(endpoint, options)
			.then(
				(res) =>
				res.ok
					? res.json()
					: Promise.reject({
							err: true,
							status: res.status || "00",
              // prettier-ignore
							statusText: res.statusText || "Error in fetch"}) // prettier-ignore
			)
			.catch((err) => err);
	};

	const get = (url: string, options: Record<string, any> = {}) => customFetch(url, options);

	const post = (url: string, options: Record<string, any> = {}) => {
		options.method = "POST";
		return customFetch(url, options);
	};

	const put = (url: string, options: Record<string, any> = {}) => {
		options.method = "PUT";
		return customFetch(url, options);
	};
	const del = (url: string, options: Record<string, any> = {}) => {
		options.method = "DELETE";
		return customFetch(url, options);
	};
	return {
		get,
		post,
		put,
		del,
	};
};
