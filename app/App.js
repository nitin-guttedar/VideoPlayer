import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Color } from './src/constants/colors';
import HomeScreen from './src/screens/HomeScreen';
import VideoScreen from './src/screens/VideoScreen';

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'App Alerts',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 500, 250, 500],
            lightColor: Color.PRIMARY_COLOR,
        });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission Error', 'Failed to get push token for push notification! Please enable permissions in settings.');
        return;
    }
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const navigationRef = useRef(null);

    useEffect(() => {
        registerForPushNotificationsAsync();
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const { screen } = response.notification.request.content.data;
            if (screen && navigationRef.current) {
                navigationRef.current.navigate(screen);
            }
        });
        return () => subscription.remove();
    }, []);

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Color.GRADIENT_START,
                },
                headerTintColor: Color.ACCENT_COLOR,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: Color.TEXT_COLOR,
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'WebView & Notifications',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="VideoPlayer"
                component={VideoScreen}
                options={{ title: 'HLS Video Player' }}
            />
        </Stack.Navigator>
    );
}

