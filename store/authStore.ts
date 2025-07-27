// store/authStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthUser {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	phoneNumber: string;
}

type AuthState = {
	id: string | null;
	isLoading: boolean;
	name: string | null;
	email: string | null;
	createdAt: string | null;
	phoneNumber: string | null;
	signOut: () => Promise<void>;
	restoreAuth: () => Promise<void>;
	signIn: (payload: AuthUser) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
	id: null,
	name: null,
	email: null,
	phoneNumber: null,
	createdAt: null,
	isLoading: true,

	signIn: async ({ id, name, email, createdAt, phoneNumber }) => {
		// Sensitive data
		await SecureStore.setItemAsync("id", id);
		await SecureStore.setItemAsync("name", name);
		await SecureStore.setItemAsync("email", email);
		await SecureStore.setItemAsync("phoneNumber", phoneNumber);

		// Non-sensitive data
		await AsyncStorage.setItem("createdAt", createdAt);

		set({ id, name, email, phoneNumber, createdAt, isLoading: false });
	},

	signOut: async () => {
		await SecureStore.deleteItemAsync("id");
		await SecureStore.deleteItemAsync("name");
		await SecureStore.deleteItemAsync("email");
		await SecureStore.deleteItemAsync("phoneNumber");

		await AsyncStorage.removeItem("createdAt");

		set({
			name: null,
			email: null,
			id: null,
			phoneNumber: null,
			createdAt: null,
			isLoading: false,
		});
	},

	restoreAuth: async () => {
		const [id, name, email, phoneNumber] = await Promise.all([
			SecureStore.getItemAsync("id"),
			SecureStore.getItemAsync("name"),
			SecureStore.getItemAsync("email"),
			SecureStore.getItemAsync("phoneNumber"),
		]);

		const createdAt = await AsyncStorage.getItem("createdAt");

		set({
			name,
			email,
			createdAt,
			phoneNumber,
			id,
			isLoading: false,
		});
	},
}));
