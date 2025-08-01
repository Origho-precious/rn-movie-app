import { useLocalSearchParams, useRouter } from "expo-router";
import { FC } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useSaveMovie } from "@/hooks/useSaveMovie";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
import AuthModal from "@/components/AuthModal";

interface MovieInfoProps {
	label: string;
	value?: string | number | null;
}

const MovieInfo: FC<MovieInfoProps> = ({ label, value }) => (
	<View className="flex-col items-start justify-center mt-5">
		<Text className="text-light-200 font-normal text-sm">{label}</Text>
		<Text className="text-light-100 font-bold text-sm mt-2">{value || "N/A"}</Text>
	</View>
);

const Details = () => {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	const res = useFetch({ fetchFunc: () => fetchMovieDetails(id as string) });
	const { isMovieSaved } = useSavedMoviesStore();
	const { loading: saveLoading, showAuthModal, saveMovie, closeAuthModal, onAuthSuccess } = useSaveMovie();

	const { data: movie, loading } = res;

	const isSaved = movie ? isMovieSaved(movie.id) : false;

	const handleSavePress = async () => {
		if (movie) {
			await saveMovie(movie as unknown as Movie);
		}
	};

	if (loading)
		return (
			<SafeAreaView className="bg-primary flex-1">
				<ActivityIndicator />
			</SafeAreaView>
		);

	return (
		<View className="bg-primary flex-1">
			<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
				<View>
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
						}}
						className="w-full h-[550px]"
						resizeMode="stretch"
					/>

					<View className="absolute bottom-5 right-5 flex-row gap-3">
						<TouchableOpacity
							onPress={handleSavePress}
							disabled={saveLoading}
							className="rounded-full size-14 bg-black/50 flex items-center justify-center"
						>
							{saveLoading ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<Image source={isSaved ? icons.saved : icons.save} className={isSaved ? "size-8" : "size-6"} />
							)}
						</TouchableOpacity>
					</View>
				</View>

				<View className="flex-col items-start justify-center mt-5 px-5">
					<Text className="text-white font-bold text-xl">{movie?.title}</Text>
					<View className="flex-row items-center gap-x-1 mt-2">
						<Text className="text-light-200 text-sm">{movie?.release_date?.split("-")[0]} •</Text>
						<Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
					</View>

					<View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
						<Image source={icons.star} className="size-4" />

						<Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average ?? 0)}/10</Text>

						<Text className="text-light-200 text-sm">({movie?.vote_count} votes)</Text>
					</View>

					<MovieInfo label="Overview" value={movie?.overview} />
					<MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"} />

					<View className="flex flex-row justify-between w-1/2">
						<MovieInfo label="Budget" value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
						<MovieInfo label="Revenue" value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`} />
					</View>

					<MovieInfo
						label="Production Companies"
						value={movie?.production_companies?.map((c) => c.name).join(" • ") || "N/A"}
					/>
				</View>
			</ScrollView>

			<TouchableOpacity
				onPress={router.back}
				className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
			>
				<Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
				<Text className="text-white font-semibold text-base">Go Back</Text>
			</TouchableOpacity>

			<AuthModal visible={showAuthModal} onClose={closeAuthModal} onSuccess={onAuthSuccess} />
		</View>
	);
};

export default Details;
