import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSavedMovies } from "@/services/appwrite";
import { useAuthStore } from "./authStore";

interface SavedMoviesState {
	loading: boolean;
	savedMovies: SavedMovie[];
	saveMovie: (movie: Movie) => void;
	getSavedMovies: () => SavedMovie[];
	fetchSavedMovies: () => Promise<void>;
	unsaveMovie: (movieId: number) => void;
	isMovieSaved: (movieId: number) => boolean;
	setSavedMovies: (movies: SavedMovie[]) => void;
}

export const useSavedMoviesStore = create<SavedMoviesState>()(
	persist(
		(set, get) => ({
			savedMovies: [],
			loading: false,

			saveMovie: (movie: Movie) => {
				const { savedMovies } = get();
				const isAlreadySaved = savedMovies.some((savedMovie) => savedMovie.movie_id === movie.id);

				if (!isAlreadySaved) {
					const authStore = useAuthStore.getState();
					const userId = authStore.id;

					if (userId) {
						set({
							savedMovies: [
								...savedMovies,
								{
									movie_id: movie.id,
									poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
									title: movie.title,
									user_id: parseInt(userId),
								},
							],
						});
					}
				}
			},

			unsaveMovie: (movieId: number) => {
				const { savedMovies } = get();
				const updatedMovies = savedMovies.filter((movie) => movie.movie_id !== movieId);
				set({ savedMovies: updatedMovies });
			},

			isMovieSaved: (movieId: number) => {
				const { savedMovies } = get();
				return savedMovies.some((movie) => movie.movie_id === movieId);
			},

			getSavedMovies: () => {
				return get().savedMovies;
			},

			setSavedMovies: (movies: SavedMovie[]) => {
				set({ savedMovies: movies });
			},

			fetchSavedMovies: async () => {
				set({ loading: true });
				try {
					const savedMoviesData = await getSavedMovies();
					set({ savedMovies: savedMoviesData, loading: false });
				} catch (error) {
					console.log("Error fetching saved movies:", error);
					set({ loading: false });
				}
			},
		}),
		{
			name: "saved-movies-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
