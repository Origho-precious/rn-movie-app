import LoadingScreen from "@/components/LoadingScreen";
import { getCurrentUser } from "@/services/appwrite";
import { useAuthStore } from "@/store/authStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
	const authId = useAuthStore((state) => state.id);
	const signOut = useAuthStore((state) => state.signOut);
	const isLoading = useAuthStore((state) => state.isLoading);
	const restoreAuth = useAuthStore((state) => state.restoreAuth);

	const verifyAuthentication = async () => {
		if (authId) {
			try {
				const currentUser = await getCurrentUser();
				if (!currentUser) {
					await signOut();
				}
			} catch (error) {
				console.log("Authentication verification failed:", error);
				await signOut();
			}
		}
	};

	useEffect(() => {
		restoreAuth();
	}, [restoreAuth]);

	useEffect(() => {
		verifyAuthentication();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authId, signOut]);

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
