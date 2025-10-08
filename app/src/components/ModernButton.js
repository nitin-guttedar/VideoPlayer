import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Color } from '../constants/colors';
const ModernButton = ({ title, onPress, iconName, color = Color.PRIMARY_COLOR, isAccent = false }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.modernButtonWrapper,
                pressed && styles.modernButtonPressed,
            ]}
        >
            <LinearGradient
                colors={isAccent ? [Color.ACCENT_COLOR, '#00A8C0'] : [color, Color.SURFACE_COLOR]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.modernButtonGradient}
            >
                {iconName && (
                    <Ionicons name={iconName} size={20} color={Color.TEXT_COLOR} style={{ marginRight: 10 }} />
                )}
                <Text style={styles.modernButtonText}>{title}</Text>
            </LinearGradient>
        </Pressable>
    )
}

export default ModernButton

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Color.SURFACE_COLOR, // Using matte surface color for header background
        borderBottomWidth: 1,
        borderBottomColor: Color.PRIMARY_COLOR,
        elevation: 10,
    },
    modernButtonWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: Color.SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    modernButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    modernButtonPressed: {
        opacity: 0.9,
        transform: [{ translateY: 1 }],
    },
    modernButtonText: {
        color: Color.TEXT_COLOR,
        fontSize: 16,
        fontWeight: '700',
    },
})