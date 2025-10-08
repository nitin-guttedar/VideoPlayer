import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../constants/colors';
const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.5625;

const VideoScreen = () => {
    const videoStream = {
        name: 'Mux HLS Test Stream',
        uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    };

    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [currentStream] = useState(videoStream);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const formatTime = (millis = 0) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleFullscreen = async () => {
        if (!video.current) return;
        if (isFullscreen) {
            await video.current.dismissFullscreenPlayer();
        } else {
            await video.current.presentFullscreenPlayer();
        }
        setIsFullscreen(!isFullscreen);
    };

    const togglePlayPause = () => {
        if (status.isPlaying) {
            video.current.pauseAsync();
        } else {
            video.current.playAsync();
        }
    };

    const ControlButton = ({ iconName, onPress, size = 32, color = 'white' }) => (
        <Pressable style={styles.videoControlButton} onPress={onPress}>
            <Ionicons name={iconName} size={size} color={color} />
        </Pressable>
    );

    return (
        <LinearGradient
            colors={[Color.GRADIENT_START, Color.GRADIENT_END]}
            style={styles.videoContainer}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={styles.videoWrapper}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{ uri: currentStream.uri }}
                    useNativeControls={false}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                    onFullscreenUpdate={({ fullscreenUpdate }) => {
                        setIsFullscreen(fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT);
                    }}
                />
                <View style={styles.controlsOverlay}>
                    <Text style={styles.timeText}>
                        {formatTime(status.positionMillis)} / {formatTime(status.durationMillis)}
                    </Text>

                    <View style={styles.controls}>
                        <ControlButton
                            iconName="reload-circle-outline"
                            onPress={() => video.current.setPositionAsync(0)}
                            size={36}
                        />
                        <ControlButton
                            iconName="play-back-outline"
                            onPress={() => video.current.setPositionAsync(status.positionMillis - 10000)}
                        />

                        <ControlButton
                            iconName={status.isPlaying ? "pause-circle" : "play-circle"}
                            onPress={togglePlayPause}
                            size={72}
                            color={Color.ACCENT_COLOR}
                        />

                        <ControlButton
                            iconName="play-forward-outline"
                            onPress={() => video.current.setPositionAsync(status.positionMillis + 10000)}
                        />
                        <ControlButton
                            iconName={status.isMuted ? "volume-mute" : "volume-high"}
                            onPress={() => video.current.setIsMutedAsync(!status.isMuted)}
                            size={36}
                        />
                    </View>

                    <View style={styles.bottomControls}>
                        <Text style={styles.streamLabel}>{currentStream.name}</Text>
                        <ControlButton
                            iconName={isFullscreen ? "contract" : "expand"}
                            onPress={handleFullscreen}
                            size={28}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.videoInfoCard}>
                <Text style={styles.cardTitle}>HLS Streaming Player</Text>
                <Text style={styles.videoDescription}>
                    Status: {status.isLoaded ? (status.isPlaying ? 'Playing' : 'Paused') : 'Loading...'}
                </Text>
                <Text style={styles.videoDescription}>
                    Stream Source: Mux Test HLS
                </Text>
            </View>
        </LinearGradient>)
}

export default VideoScreen

const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    controlsOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: Color.CONTROLS_COLOR,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },
    videoControlButton: {
        padding: 8,
    },
    timeText: {
        color: Color.TEXT_COLOR,
        fontSize: 14,
        alignSelf: 'flex-end',
        backgroundColor: Color.CONTROLS_COLOR,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    streamLabel: {
        color: Color.TEXT_COLOR,
        fontWeight: '500',
        fontSize: 14,
    },
    videoInfoCard: {
        padding: 20,
        backgroundColor: Color.SURFACE_COLOR,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: -10,
    },
    videoDescription: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
    videoWrapper: {
        width: '100%',
        height: VIDEO_HEIGHT,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        color: Color.ACCENT_COLOR,
        fontSize: 16,
        fontWeight: 'bold',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Color.GRADIENT_START,
    },
})