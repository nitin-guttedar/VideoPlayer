import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import ModernButton from '../components/ModernButton';
import { Color } from '../constants/colors';
import { schedulePushNotification } from '../services/scheduleNotification';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    return (
        <LinearGradient
            colors={[Color.GRADIENT_START, Color.GRADIENT_END]}
            style={styles.container}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>WEBVIEW & NOTIFICATIONS</Text>
            </View>

            <View style={styles.contentCard}>
                <Text style={styles.cardTitle}>Live Content Feed (Flipkart)</Text>

                <View style={styles.webviewContainer}>
                    {isLoading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color={Color.ACCENT_COLOR} />
                            <Text style={styles.loadingText}>Loading web content...</Text>
                        </View>
                    )}
                    <WebView
                        style={styles.webview}
                        source={{ uri: 'https://www.flipkart.com/' }}
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => {
                            setIsLoading(false);
                            schedulePushNotification("Website Loaded! ", "The Flipkart site is ready to browse.", 1);
                        }}
                        onError={() => {
                            setIsLoading(false);
                            Alert.alert("Connection Error", "Could not load the WebView content. Check your network.");
                        }}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <ModernButton
                    title="Schedule Simple Notification "
                    onPress={() => schedulePushNotification("Delayed Alert ", "A standard notification has been scheduled.", 3)}
                    iconName="alarm-outline"
                    color={Color.PRIMARY_COLOR}
                />
                <ModernButton
                    title="Notify & Open Video"
                    onPress={() => {
                        schedulePushNotification(
                            "Video Stream Ready! ",
                            "Tap this to instantly jump to the player.",
                            5,
                            { screen: 'VideoPlayer' }
                        );
                    }}
                    iconName="play-circle-outline"
                    isAccent={true}
                />

                <ModernButton
                    title="Go to Video Player Now"
                    onPress={() => navigation.navigate('VideoPlayer')}
                    iconName="arrow-forward-circle-outline"
                    color={Color.PRIMARY_COLOR}
                />
            </View>
        </LinearGradient>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Color.SURFACE_COLOR,
        borderBottomColor: Color.PRIMARY_COLOR,
        elevation: 10,
    },
    headerTitle: {
        color: Color.TEXT_COLOR,
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    contentCard: {
        margin: 15,
        borderRadius: 15,
        backgroundColor: Color.SURFACE_COLOR,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: Color.SHADOW_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        flex: 1,
        marginBottom: 10,
    },
    cardTitle: {
        color: Color.ACCENT_COLOR,
        fontSize: 16,
        fontWeight: 'bold',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Color.GRADIENT_START,
    },
    webviewContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: Color.SURFACE_COLOR,
    },
    webview: {
        flex: 1,
        backgroundColor: Color.SURFACE_COLOR,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Color.SURFACE_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        color: Color.PRIMARY_COLOR,
        marginTop: 10,
        fontSize: 16,
    },
    buttonContainer: {
        padding: 15,
        backgroundColor: 'transparent',
        gap: 12,
    },
})