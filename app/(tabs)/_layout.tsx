import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { FC } from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon: FC<{
	icon: any;
	title: string;
	focused: boolean;
}> = ({ focused, icon, title }) => {
	if (focused) {
		return (
			<ImageBackground
				source={images.highlight}
				className="w-full min-w-[112px] min-h-16 flex flex-row flex-1 items-center justify-center mt-4 rounded-full overflow-hidden"
			>
				<Image source={icon} tintColor="#151312" className="size-5" />
				<Text className="text-secondary text-base font-semibold">{title}</Text>
			</ImageBackground>
		);
	}

	return (
		<View className="size-full mt-4 justify-center items-center rounded-full">
			<Image source={icon} tintColor="#A8B5DB" className="size-5" />
		</View>
	);
};

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
				},
				tabBarStyle: {
					height: 52,
					borderWidth: 1,
					marginBottom: 36,
					borderRadius: 50,
					overflow: "hidden",
					position: "absolute",
					marginHorizontal: 10,
					borderColor: "#0F0D23",
					backgroundColor: "#0F0D23",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return <TabIcon icon={icons.home} title="Home" focused={focused} />;
					},
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return <TabIcon icon={icons.search} title="Search" focused={focused} />;
					},
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: "Saved",
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return <TabIcon icon={icons.save} title="Saved" focused={focused} />;
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return <TabIcon icon={icons.person} title="Profile" focused={focused} />;
					},
				}}
			/>
		</Tabs>
	);
};

export default _layout;
