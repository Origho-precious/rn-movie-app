import { icons } from "@/constants/icons";
import { userSignOut } from "@/services/appwrite";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthModal from "@/components/AuthModal";

const ProfileScreen = () => {
	const authStore = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "Unknown";

		try {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		} catch {
			return "Unknown";
		}
	};

	const handleSignOut = async () => {
		Alert.alert("Sign Out", "Are you sure you want to sign out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Sign Out",
				style: "destructive",
				onPress: async () => {
					setLoading(true);
					try {
						await userSignOut();
					} catch (error: any) {
						Alert.alert("Error", error.message || "Failed to sign out");
					} finally {
						setLoading(false);
					}
				},
			},
		]);
	};

	if (!authStore.id) {
		return (
			<SafeAreaView className="bg-primary flex-1 px-6">
				<View className="flex justify-center items-center flex-1">
					<Image source={icons.person} className="size-20 mb-6" tintColor="#9CA3AF" />
					<Text className="text-white text-xl font-bold mb-2">Welcome!</Text>
					<Text className="text-gray-400 text-center text-base mb-8">
						Sign in to view your profile and manage your saved movies.
					</Text>

					<TouchableOpacity onPress={() => setShowAuthModal(true)} className="w-full bg-blue-600 px-8 py-4 rounded-lg">
						<Text className="text-white font-bold text-base text-center">Sign In</Text>
					</TouchableOpacity>
				</View>

				<AuthModal
					visible={showAuthModal}
					onClose={() => setShowAuthModal(false)}
					onSuccess={() => setShowAuthModal(false)}
				/>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="bg-primary flex-1 px-6">
			<View className="flex-1">
				<View className="py-6">
					<Text className="text-white text-2xl font-bold">Profile</Text>
				</View>

				<View className="bg-dark-200 rounded-xl p-6 mb-6">
					<View className="items-center mb-6">
						<Image source={icons.person} className="size-20 mb-4" />
						<Text className="text-white text-xl font-bold">{authStore.name || "User"}</Text>
					</View>

					<View className="space-y-4">
						<View className="bg-dark-300 p-4 rounded-lg">
							<Text className="text-gray-400 text-sm font-medium mb-1">Full Name</Text>
							<Text className="text-white text-base">{authStore.name || "N/A"}</Text>
						</View>

						<View className="bg-dark-300 p-4 rounded-lg">
							<Text className="text-gray-400 text-sm font-medium mb-1">Email</Text>
							<Text className="text-white text-base">{authStore.email || "N/A"}</Text>
						</View>

						<View className="bg-dark-300 p-4 rounded-lg">
							<Text className="text-gray-400 text-sm font-medium mb-1">Member Since</Text>
							<Text className="text-white text-base">{formatDate(authStore.createdAt)}</Text>
						</View>

						{authStore.phoneNumber && (
							<View className="bg-dark-300 p-4 rounded-lg">
								<Text className="text-gray-400 text-sm font-medium mb-1">Phone Number</Text>
								<Text className="text-white text-base">{authStore.phoneNumber}</Text>
							</View>
						)}
					</View>
				</View>

				<TouchableOpacity onPress={handleSignOut} disabled={loading} className="bg-red-600 p-4 rounded-lg">
					<Text className="text-white font-bold text-center text-base">{loading ? "Signing out..." : "Sign Out"}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ProfileScreen;
