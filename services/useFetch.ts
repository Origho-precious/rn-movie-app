import { useEffect, useState } from "react";

interface Props<T> {
	autoFetch?: boolean;
	fetchFunc: () => Promise<T>;
}

function useFetch<T>({ autoFetch = true, fetchFunc }: Props<T>) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);


		try {
			const result = await fetchFunc();
			setData(result);
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
			} else {
				setError(new Error("An error occurred"));
			}
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setLoading(false);
		setData(null);
		setError(null);
	};

	useEffect(() => {

		if (autoFetch) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { loading, data, error, loadMovies: fetchData, reset };
}

export { useFetch };
