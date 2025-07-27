import SavedMovieCard from "@/components/SavedMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
import { useAuthStore } from "@/store/authStore";
import AuthModal from "@/components/AuthModal";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const SavedScreen = () => {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const authStore = useAuthStore();
	const { savedMovies, loading, fetchSavedMovies } = useSavedMoviesStore();

	useEffect(() => {
		if (authStore.id) {
			fetchSavedMovies();
		}
	}, [authStore.id, fetchSavedMovies]);

	if (!authStore.id) {
		return (
			<View className="flex-1 bg-primary">
				<Image source={images.bg} className="absolute w-full z-0" />
				<View className="flex-1 justify-center items-center px-6">
					<Image source={icons.saved} className="size-16 mb-4" tintColor="#fff" />
					<Text className="text-white text-xl font-bold mb-2 text-center">
						Sign in to view your saved movies
					</Text>
					<Text className="text-gray-400 text-center mb-6">
						Keep track of movies you want to watch later
					</Text>
					<Text 
						className="text-accent text-lg font-semibold"
						onPress={() => setShowAuthModal(true)}
					>
						Sign In
					</Text>
				</View>
				<AuthModal 
					visible={showAuthModal} 
					onClose={() => setShowAuthModal(false)}
					onSuccess={() => setShowAuthModal(false)}
				/>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute w-full z-0" />
			<FlatList
				numColumns={2}
				data={savedMovies}
				className="mt-2 pb-32"
				contentContainerStyle={{ paddingBottom: 100 }}
				keyExtractor={(item) => item?.movie_id?.toString()}
				renderItem={({ item }) => <SavedMovieCard {...item} />}
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

						<View className="my-5 px-5">
							<Text className="text-2xl text-white font-bold mb-2">
								Your Saved Movies
							</Text>
							<Text className="text-gray-400">
								{savedMovies.length} movie{savedMovies.length !== 1 ? 's' : ''} saved
							</Text>
						</View>

						{loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}
					</>
				}
				ListEmptyComponent={
					!loading ? (
						<View className="mt-10 px-5">
							<View className="items-center">
								<Image source={icons.saved} className="size-16 mb-4" tintColor="#666" />
								<Text className="text-center text-gray-500 text-lg font-semibold mb-2">
									No saved movies yet
								</Text>
								<Text className="text-center text-gray-400">
									Start exploring and save movies you want to watch later
								</Text>
							</View>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default SavedScreen;