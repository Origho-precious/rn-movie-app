const TMDB_CONFIG = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
	HEADERS: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
	},
};

const fetchMovies = async (params: { query?: string }) => {
	const query = params.query;

	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.des`;

	const res = await fetch(endpoint, {
		method: "GET",
		headers: TMDB_CONFIG.HEADERS,
	});

	if (!res.ok) {
		// @ts-ignore
		throw new Error("Failed to fetch movies:", res.statusText);
	}

	const data = await res.json();
	return data.results as Movie[];
};

export {TMDB_CONFIG, fetchMovies}