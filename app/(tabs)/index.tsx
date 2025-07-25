import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Home() {
	const router = useRouter();

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

				{loading ? (
					<ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
				) : error ? (
					<Text>Error: {error?.message}</Text>
				) : (
					<View className="flex-1 mt-5">
						<SearchBar onPress={() => router.push("/search")} placeholder="Search through 300+ movies online" />

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
