import { icons } from "@/constants/icons";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.8)).current;
	const rotateAnim = useRef(new Animated.Value(0)).current;
	const pulseAnim = useRef(new Animated.Value(1)).current;
	const dotAnims = useRef([
		new Animated.Value(0),
		new Animated.Value(0),
		new Animated.Value(0),
	]).current;

	useEffect(() => {
		const startAnimations = () => {
			// Fade in animation
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 800,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}).start();

			// Scale animation
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 800,
				easing: Easing.out(Easing.back(1.2)),
				useNativeDriver: true,
			}).start();

			// Rotation animation
			Animated.loop(
				Animated.timing(rotateAnim, {
					toValue: 1,
					duration: 2000,
					easing: Easing.linear,
					useNativeDriver: true,
				})
			).start();

			// Pulse animation
			Animated.loop(
				Animated.sequence([
					Animated.timing(pulseAnim, {
						toValue: 1.1,
						duration: 1000,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
					Animated.timing(pulseAnim, {
						toValue: 1,
						duration: 1000,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
				])
			).start();

			// Dot animations
			dotAnims.forEach((dotAnim, index) => {
				Animated.loop(
					Animated.sequence([
						Animated.delay(index * 200),
						Animated.timing(dotAnim, {
							toValue: -8,
							duration: 400,
							easing: Easing.inOut(Easing.ease),
							useNativeDriver: true,
						}),
						Animated.timing(dotAnim, {
							toValue: 0,
							duration: 400,
							easing: Easing.inOut(Easing.ease),
							useNativeDriver: true,
						}),
					])
				).start();
			});
		};

		startAnimations();
	}, [fadeAnim, scaleAnim, rotateAnim, pulseAnim, dotAnims]);

	const spin = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<SafeAreaView className="bg-primary flex-1">
			<View className="flex-1 justify-center items-center">
				{/* Background gradient effect */}
				<View className="absolute inset-0 bg-gradient-to-br from-primary to-dark-300 opacity-90" />
				
				{/* Main loading container */}
				<Animated.View
					style={{
						opacity: fadeAnim,
						transform: [{ scale: scaleAnim }],
					}}
					className="items-center"
				>
					{/* Rotating outer ring */}
					<Animated.View
						style={{
							transform: [{ rotate: spin }],
						}}
						className="w-24 h-24 border-2 border-blue-500/30 border-t-blue-500 rounded-full mb-8"
					/>

					{/* App logo/icon with pulse */}
					<Animated.View
						style={{
							transform: [{ scale: pulseAnim }],
						}}
						className="absolute top-4 w-16 h-16 bg-blue-500/20 rounded-full items-center justify-center"
					>
						<Image 
							source={icons.logo} 
							className="w-10 h-10" 
							style={{ tintColor: '#3B82F6' }}
						/>
					</Animated.View>

					{/* Loading text with elegant typography */}
					<View className="items-center mt-16">
						<Text className="text-white text-2xl font-light tracking-wider mb-2">
							Movie Finder
						</Text>
						<Text className="text-blue-400 text-sm font-medium tracking-widest uppercase opacity-80">
							Loading your experience
						</Text>
						
						{/* Animated dots */}
						<View className="flex-row mt-4 space-x-1">
							{dotAnims.map((dotAnim, index) => (
								<Animated.View
									key={index}
									style={{
										opacity: fadeAnim,
										transform: [{ translateY: dotAnim }],
									}}
									className="w-2 h-2 bg-blue-400 rounded-full"
								/>
							))}
						</View>
					</View>
				</Animated.View>

				{/* Bottom accent */}
				<View className="absolute bottom-16 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
			</View>
		</SafeAreaView>
	);
};

export default LoadingScreen;