import { Account, Client, Databases, ID, Query } from "react-native-appwrite";
import { useAuthStore } from "../store/authStore";

const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const METRIC_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_METRIC_COLLECTION_ID!;
const SAVED_MOVIES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID!;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

const updateSearchCount = async (query: string, movie: Movie) => {
	try {
		const result = await database.listDocuments(DATABASE_ID, METRIC_COLLECTION_ID, [Query.equal("searchTerm", query)]);

		if (result.documents.length > 0) {
			const existingMovie = result.documents[0];
			await database.updateDocument(DATABASE_ID, METRIC_COLLECTION_ID, existingMovie.$id, {
				count: existingMovie.count + 1,
			});
		} else {
			await database.createDocument(DATABASE_ID, METRIC_COLLECTION_ID, ID.unique(), {
				searchTerm: query,
				movie_id: movie.id,
				title: movie.title,
				count: 1,
				poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			});
		}
	} catch (error) {
		console.log("Error updating search count:", error);
		throw error;
	}
};

const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
	try {
		const result = await database.listDocuments(DATABASE_ID, METRIC_COLLECTION_ID, [
			Query.limit(5),
			Query.orderDesc("count"),
		]);

		return result.documents as unknown as TrendingMovie[];
	} catch (error) {
		console.log(error);
		return [];
	}
};

const userSignUp = async (email: string, password: string, name: string) => {
	try {
		const result = await account.create(ID.unique(), email, password, name);

		// console.log("result:", result);

		const authStore = useAuthStore.getState();
		await authStore.signIn({
			id: result.$id,
			name: result.name,
			email: result.email,
			createdAt: result.$createdAt,
			phoneNumber: result.phone || "",
		});

		return result;
	} catch (error) {
		console.log("Error creating user account:", error);
		throw error;
	}
};

const userSignIn = async (email: string, password: string) => {
	try {
		await account.createEmailPasswordSession(email, password);
		
		const user = await account.get();

		const authStore = useAuthStore.getState();
		await authStore.signIn({
			id: user.$id,
			name: user.name,
			email: user.email,
			createdAt: user.$createdAt,
			phoneNumber: user.phone || "",
		});

		return user;
	} catch (error) {
		console.log("Error signing in:", error);
		throw error;
	}
};

const userSignOut = async () => {
	try {
		await account.deleteSession("current");

		const authStore = useAuthStore.getState();
		await authStore.signOut();
	} catch (error) {
		console.log("Error signing out:", error);
		throw error;
	}
};

const getCurrentUser = async () => {
	try {
		return await account.get();
	} catch (error) {
		console.log("Error getting current user:", error);
		return null;
	}
};

const getSavedMovies = async () => {
	try {
		const authStore = useAuthStore.getState();
		const userId = authStore.id;

		if (!userId) {
			return [];
		}

		const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
			Query.equal("user_id", userId),
			Query.orderDesc("$createdAt"),
		]);

		return result.documents as unknown as SavedMovie[];
	} catch (error) {
		console.log("Error getting saved movies:", error);
		throw error;
	}
};

const updateSavedMovieList = async (movie: Movie) => {
	try {
		const authStore = useAuthStore.getState();
		const userId = authStore.id;

		if (!userId) {
			throw new Error("User not authenticated");
		}

		const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, [
			Query.equal("movie_id", movie.id),
			Query.equal("user_id", userId),
		]);

		if (result.documents.length > 0) {
			const existingMovie = result.documents[0];
			await database.deleteDocument(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, existingMovie.$id);
			return { action: "removed", movie };
		} else {
			await database.createDocument(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, ID.unique(), {
				user_id: userId,
				movie_id: movie.id,
				title: movie.title,
				poster_url: movie.poster_path
					? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
					: "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
			});
			return { action: "saved", movie };
		}
	} catch (error) {
		console.log("Error updating saved movie list:", error);
		throw error;
	}
};

export {
	getCurrentUser,
	getSavedMovies,
	getTrendingMovies,
	updateSavedMovieList,
	updateSearchCount,
	userSignIn,
	userSignOut,
	userSignUp
};

