import { icons } from "@/constants/icons";
import React, { FC } from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
	onPress?: () => void;
	placeholder: string;
}

const SearchBar: FC<Props> = ({ onPress = () => {}, placeholder }) => {
	return (
		<View className="flex-row items-center bg-dark-200 px-5 py-4 rounded-full">
			<Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
			<TextInput
				value=""
				onPress={onPress}
				onChangeText={() => {}}
				placeholder={placeholder}
				placeholderTextColor="#a8b5db"
				className="flex-1 ml-2 text-white"
			/>
		</View>
	);
};

export default SearchBar;
