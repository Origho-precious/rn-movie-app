import { userSignIn, userSignUp } from "@/services/appwrite";
import { FC, useState } from "react";
import { ActivityIndicator, Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

interface AuthModalProps {
	visible: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ visible, onClose, onSuccess }) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	// Focus states for inputs
	const [focusStates, setFocusStates] = useState({
		name: false,
		email: false,
		password: false,
	});

	const handleSubmit = async () => {
		if (!formData.email || !formData.password) {
			Alert.alert("Error", "Please fill in all required fields");
			return;
		}

		if (isSignUp && !formData.name) {
			Alert.alert("Error", "Please enter your name");
			return;
		}

		setLoading(true);
		try {
			if (isSignUp) {
				await userSignUp(formData.email, formData.password, formData.name);
			} else {
				await userSignIn(formData.email, formData.password);
			}
			onSuccess();
			onClose();
			setFormData({ name: "", email: "", password: "" });
		} catch (error: any) {
			Alert.alert("Error", error.message || "Authentication failed");
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setFormData({ name: "", email: "", password: "" });
		setIsSignUp(false);
		setShowPassword(false);
		setFocusStates({ name: false, email: false, password: false });
	};

	const handleFocus = (field: keyof typeof focusStates) => {
		setFocusStates((prev) => ({ ...prev, [field]: true }));
	};

	const handleBlur = (field: keyof typeof focusStates) => {
		setFocusStates((prev) => ({ ...prev, [field]: false }));
	};

	const getInputStyle = (field: keyof typeof focusStates) => {
		const baseStyle = "bg-dark-300 border text-white p-4 rounded-xl";
		const borderStyle = focusStates[field] ? "border-blue-400" : "border-white/30";
		return `${baseStyle} ${borderStyle}`;
	};

	const handleClose = () => {
		resetForm();
		onClose();
	};

	return (
		<Modal visible={visible} transparent animationType="slide">
			<View className="flex-1 bg-black/50 justify-center items-center px-6">
				<View className="bg-dark-200 rounded-xl p-6 w-full max-w-sm">
					<Text className="text-white text-xl font-bold text-center mb-6">
						{isSignUp ? "Create Account" : "Sign In"}
					</Text>

					{isSignUp && (
						<TextInput
							className={`${getInputStyle("name")} mb-4`}
							placeholder="Full Name"
							placeholderTextColor="#9CA3AF"
							value={formData.name}
							onChangeText={(text) => setFormData({ ...formData, name: text })}
							onFocus={() => handleFocus("name")}
							onBlur={() => handleBlur("name")}
							editable={!loading}
						/>
					)}

					<TextInput
						className={`${getInputStyle("email")} mb-4`}
						placeholder="Email"
						placeholderTextColor="#9CA3AF"
						value={formData.email}
						onChangeText={(text) => setFormData({ ...formData, email: text })}
						onFocus={() => handleFocus("email")}
						onBlur={() => handleBlur("email")}
						keyboardType="email-address"
						autoCapitalize="none"
						editable={!loading}
					/>

					<View className="relative mb-6">
						<TextInput
							className={`${getInputStyle("password")} pr-12`}
							placeholder="Password"
							placeholderTextColor="#9CA3AF"
							value={formData.password}
							onChangeText={(text) => setFormData({ ...formData, password: text })}
							onFocus={() => handleFocus("password")}
							onBlur={() => handleBlur("password")}
							secureTextEntry={!showPassword}
							editable={!loading}
						/>
						<TouchableOpacity
							onPress={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-4"
							disabled={loading}
						>
							<View className="w-5 h-5 items-center justify-center">
								<Text className={`text-sm ${showPassword ? "text-blue-400" : "text-gray-400"}`}>
									{showPassword ? "🙈" : "👁️"}
								</Text>
							</View>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						className={`bg-primary p-4 rounded-lg mb-4 ${loading ? "opacity-50" : ""}`}
						onPress={handleSubmit}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color="white" />
						) : (
							<Text className="text-white font-bold text-center">{isSignUp ? "Create Account" : "Sign In"}</Text>
						)}
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => setIsSignUp(!isSignUp)}
						disabled={loading}
						className="mb-4 py-2"
						activeOpacity={0.7}
					>
						<Text className="text-blue-400 text-center font-medium">
							{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={handleClose} disabled={loading}>
						<Text className="text-gray-400 text-center">Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default AuthModal;
