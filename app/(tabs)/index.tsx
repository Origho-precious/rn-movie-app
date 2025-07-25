import { Text, View } from "react-native";
import "../globals.css";

export default function Home() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-5xl text-primary font-bold">Welcome!</Text>
		</View>
	);
}
