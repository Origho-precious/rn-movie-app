import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Alert } from "react-native";
import { updateSavedMovieList } from "../services/appwrite";

export const useSaveMovie = () => {
	const authStore = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);

	// console.log("authStore:", authStore);

	const saveMovie = async (movie: Movie) => {
		// Check if user is authenticated
		if (!authStore.id) {
			setShowAuthModal(true);
			return;
		}

		setLoading(true);
		try {
			const result = await updateSavedMovieList(movie);

			if (result.action === "saved") {
				Alert.alert("Success", `${movie.title} has been saved to your list`);
			} else {
				Alert.alert("Removed", `${movie.title} has been removed from your list`);
			}

			return result;
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to save movie");
		} finally {
			setLoading(false);
		}
	};

	const closeAuthModal = () => {
		setShowAuthModal(false);
	};

	const onAuthSuccess = () => {
		setShowAuthModal(false);
		// Could trigger save again here if needed
	};

	return {
		loading,
		showAuthModal,
		saveMovie,
		closeAuthModal,
		onAuthSuccess,
	};
};
