import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = Movie;

const MovieCard: FC<Props> = ({ id, poster_path, title, vote_average, release_date }) => {
	console.log("poster_path:", poster_path);

	return (
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

				<View className="flex-row items-center justify-start gap-x-1">
					<Image source={icons.star} className="size-4" />
					<Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average / 2)}</Text>
				</View>

				<View className="flex-row items-center justify-between">
					<Text className="text-xs text-light-300 font-medium mt-1">{release_date?.split("-")[0]}</Text>
					{/* <Text className="text-xs text-light-300 font-medium uppercase">Movie</Text> */}
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;
