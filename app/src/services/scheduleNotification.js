import * as Notifications from 'expo-notifications';

export async function schedulePushNotification(title, body, seconds = 3, data = {}) {
    // The delay logic is correctly applied here using 'trigger: { seconds }'
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data, // Attach custom data to the notification
            sound: true,
        },
        trigger: { seconds },
    });
    // Add a console log to verify the scheduling time
    console.log(`Notification scheduled: "${title}" in ${seconds} seconds.`);
}