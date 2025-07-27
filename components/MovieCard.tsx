import { icons } from "@/constants/icons";
import { useSaveMovie } from "@/hooks/useSaveMovie";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
import { Link } from "expo-router";
import React, { FC } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import AuthModal from "./AuthModal";

type Props = Movie;

const MovieCard: FC<Props> = (movieProps) => {
	const { id, poster_path, title, vote_average, release_date } = movieProps;

	const { isMovieSaved } = useSavedMoviesStore();
	const { loading, showAuthModal, saveMovie, closeAuthModal, onAuthSuccess } = useSaveMovie();

	const movie = movieProps;
	const isSaved = isMovieSaved(id);

	const handleSavePress = async () => {
		await saveMovie(movie);
	};

	return (
		<>
			<Link asChild href={`/movies/${id}`}>
				<TouchableOpacity className="w-[30%]">
					<Image
						resizeMode="cover"
						className="w-full h-52 rounded-lg"
						source={{
							uri: poster_path
								? `https://image.tmdb.org/t/p/w500${poster_path}`
								: "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
						}}
					/>

					<Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
						{title}
					</Text>

					<View className="flex-row justify-between">
						<View>
							<View className="flex-row items-center justify-start gap-x-1">
								<Image source={icons.star} className="size-4" />
								<Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average / 2)}</Text>
							</View>

							<View className="flex-row items-center justify-between">
								<Text className="text-xs text-light-300 font-medium mt-1">{release_date?.split("-")[0]}</Text>
							</View>
						</View>

						<TouchableOpacity onPress={handleSavePress} disabled={loading}>
							{loading ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<Image source={isSaved ? icons.saved : icons.save} className={isSaved ? "size-8" : "size-6"} />
							)}
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Link>

			<AuthModal visible={showAuthModal} onClose={closeAuthModal} onSuccess={onAuthSuccess} />
		</>
	);
};

export default MovieCard;
