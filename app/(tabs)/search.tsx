import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const SearchScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const {
		error,
		reset,
		loading,
		loadMovies,
		data: movies,
	} = useFetch({
		autoFetch: false,
		fetchFunc: () => fetchMovies({ query: searchQuery }),
	});

	const triggerSearch = async () => {
		if (searchQuery.trim()) {
			await loadMovies();
		} else {
			reset();
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(triggerSearch, 500);

		return () => clearTimeout(timeoutId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	useEffect(() => {
		if (movies?.length! > 0 && movies?.[0]) {
			updateSearchCount(searchQuery, movies[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movies]);

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0" />
			<FlatList
				data={movies}
				numColumns={3}
				scrollEnabled={false}
				className="mt-2 pb-32"
				keyExtractor={(item) => item?.id?.toString()}
				contentContainerStyle={{ paddingBottom: 100 }}
				renderItem={({ item }) => <MovieCard {...item} />}
				columnWrapperStyle={{
					gap: 16,
					marginVertical: 16,
					justifyContent: "flex-start",
				}}
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center mt-20 items-center">
							<Image source={icons.logo} className="h-10 w-10" />
						</View>

						<View className="my-5">
							<SearchBar
								value={searchQuery}
								onChange={(text) => setSearchQuery(text)}
								placeholder="Search through 300+ movies online"
							/>
						</View>

						{loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}

						{error && <Text className="text-red-500 px-5 my-3">Error: {error.message}</Text>}

						{!loading && !error && searchQuery.trim() && movies?.length! > 0 && (
							<Text className="text-xl text-white font-bold">
								Search Results for <Text className="text-accent">{searchQuery}</Text>
							</Text>
						)}
					</>
				}
				ListEmptyComponent={
					!loading && !error ? (
						<View className="mt-10 px-5">
							<Text className="text-center text-gray-500">
								{searchQuery.trim() ? "No movies found" : "Start typing to search for movies"}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default SearchScreen;
