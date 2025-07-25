import { icons } from "@/constants/icons";
import React, { FC } from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
	value?: string;
	placeholder: string;
	onPress?: () => void;
	onChange?: (text: string) => void;
}

const SearchBar: FC<Props> = ({ value = "", onPress, placeholder, onChange = () => {} }) => {
	return (
		<View className="flex-row items-center bg-dark-200 px-5 py-4 rounded-full">
			<Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
			<TextInput
				value={value}
				onPress={onPress}
				placeholder={placeholder}
				placeholderTextColor="#a8b5db"
				className="flex-1 ml-2 text-white"
				onChangeText={(text) => onChange(text)}
			/>
		</View>
	);
};

export default SearchBar;
