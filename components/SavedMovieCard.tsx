import { icons } from "@/constants/icons";
import { updateSavedMovieList } from "@/services/appwrite";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
import { Link } from "expo-router";
import React, { FC, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from "react-native";

type Props = SavedMovie;

const SavedMovieCard: FC<Props> = (savedMovie) => {
	const { movie_id, title, poster_url } = savedMovie;
	const [loading, setLoading] = useState(false);
	const { unsaveMovie } = useSavedMoviesStore();

	const handleUnsavePress = async () => {
		setLoading(true);

		try {
			// Convert SavedMovie to Movie format for the API call
			const movieForApi: Movie = {
				id: movie_id,
				title: title,
				poster_path: poster_url?.replace("https://image.tmdb.org/t/p/w500", "") || "",
				overview: "",
				release_date: "",
				vote_average: 0,
				vote_count: 0,
				genre_ids: [],
				adult: false,
				backdrop_path: "",
				original_language: "",
				original_title: title,
				popularity: 0,
				video: false,
			};

			const result = await updateSavedMovieList(movieForApi);

			if (result.action === "removed") {
				unsaveMovie(movie_id);
				Alert.alert("Removed", `${title} has been removed from your saved list`);
			}
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to remove movie");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Link asChild href={`/movies/${movie_id}`}>
				<TouchableOpacity className="w-[47%]">
					<Image resizeMode="cover" className="w-full h-80 rounded-lg" source={{ uri: poster_url }} />

					<Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
						{title}
					</Text>

					<View className="flex-row justify-between items-center mt-1">
						<Text className="text-xs text-light-300 font-medium">Saved</Text>

						<TouchableOpacity onPress={handleUnsavePress} disabled={loading}>
							{loading ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<Image source={icons.saved} className="size-8" />
							)}
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Link>
		</>
	);
};

export default SavedMovieCard;
