import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Home() {
	const router = useRouter();

	const {
		data: trendingMovies,
		error: trendingError,
		loading: trendingLoading,
	} = useFetch({
		autoFetch: true,
		fetchFunc: () => getTrendingMovies(),
	});

	const {
		data: movies,
		loading,
		error,
	} = useFetch({
		autoFetch: true,
		fetchFunc: () => fetchMovies({ query: "" }),
	});

	// console.log("error:", error);
	// console.log("movies:", movies);

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0" />

			<ScrollView
				className="flex-1 px-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%" }}
			>
				<Image source={icons.logo} className="h-10 w-12 mx-auto mt-20 mb-5" />

				{loading || trendingLoading ? (
					<ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
				) : error || trendingError ? (
					<Text>Error: {error?.message}</Text>
				) : (
					<View className="flex-1 mt-5">
						<SearchBar onPress={() => router.push("/search")} placeholder="Search through 300+ movies online" />

						{trendingMovies && (
							<View className="mt-10">
								<Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
								<FlatList
									horizontal
									className="mb-4 mt-3"
									data={trendingMovies}
									contentContainerStyle={{ gap: 26 }}
									showsHorizontalScrollIndicator={false}
									ItemSeparatorComponent={() => <View className="w-4" />}
									keyExtractor={(item, idx) => `${item.movie_id}_${idx}`.toString()}
									renderItem={({ item, index }) => <TrendingMovieCard index={index} movie={item} />}
								/>
							</View>
						)}

						<>
							<Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

							<FlatList
								data={movies}
								numColumns={3}
								scrollEnabled={false}
								className="mt-2 pb-32"
								keyExtractor={(item) => item?.id?.toString()}
								renderItem={({ item }) => <MovieCard {...item} />}
								columnWrapperStyle={{
									gap: 16,
									paddingRight: 5,
									marginBottom: 16,
									justifyContent: "flex-start",
								}}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
