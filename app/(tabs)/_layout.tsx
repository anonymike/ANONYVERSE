import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { Platform } from "react-native";
function HomeIcon({ color, size }: any) { return <Ionicons name="home" color={color} size={size} />; }
function DiscoverIcon({ color, size }: any) { return <Ionicons name="search" color={color} size={size} />; }
function SportsIcon({ color, size }: any) { return <Ionicons name="basketball" color={color} size={size} />; }
function LibraryIcon({ color, size }: any) { return <Ionicons name="bookmark" color={color} size={size} />; }
function ProfileIcon({ color, size }: any) { return <Ionicons name="person" color={color} size={size} />; }
export default function TabLayout() { const insets = useSafeAreaInsets(); const bottomPadding = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8); return <Tabs screenOptions={{ tabBarActiveTintColor: "#F04452", tabBarInactiveTintColor: "#738092", headerShown: false, tabBarButton: HapticTab, tabBarStyle: { paddingTop: 8, paddingBottom: bottomPadding, height: 58 + bottomPadding, backgroundColor: "#07090D", borderTopColor: "#202733", borderTopWidth: 0.5 }, tabBarLabelStyle: { fontSize: 10, fontWeight: "700" } }}><Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: HomeIcon }} /><Tabs.Screen name="discover" options={{ title: "Discover", tabBarIcon: DiscoverIcon }} /><Tabs.Screen name="sports" options={{ title: "Sports", tabBarIcon: SportsIcon }} /><Tabs.Screen name="library" options={{ title: "My List", tabBarIcon: LibraryIcon }} /><Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ProfileIcon }} /></Tabs>; }
