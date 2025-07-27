import LoadingScreen from "@/components/LoadingScreen";
import { useAuthStore } from "@/store/authStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
	const isLoading = useAuthStore((state) => state.isLoading);
	const restoreAuth = useAuthStore((state) => state.restoreAuth);

	useEffect(() => {
		restoreAuth();
	}, [restoreAuth]);

	if (isLoading) {
		return (
			<>
				<StatusBar hidden={true} />
				<LoadingScreen />
			</>
		);
	}

	return (
		<>
			<StatusBar hidden={true} />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}
