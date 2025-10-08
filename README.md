# WebView & Push Notifications Demo 🔔

A modern mobile application built with **React Native** and **Expo** that showcases robust integration of advanced mobile features: **deep-linking push notifications**, an **embedded WebView**, and a **custom HLS video player**.

---

## ✨ Key Features

- **Push Notifications:**
  - Schedules local push notifications using `expo-notifications`.
  - Notifications are also scheduled based on app events, such as when the WebView finishes loading.
- **Embedded WebView (`react-native-webview`):**
  - Displays live web content (e.g., Flipkart) within a dedicated card on the **Home Screen**.
  - Includes a custom **loading overlay** and spinner that appears while content is being fetched.
- **Custom HLS Video Player:**
  - A dedicated screen utilizing **`expo-av`** to play HLS streams (`.m3u8` format).
  - Features a **fully customized control overlay** (Play/Pause, Forward/Rewind 10s, Mute/Unmute, Fullscreen toggle, and time display).
- **Modern Themed UI:** Utilizes **`expo-linear-gradient`** for engaging backgrounds and a consistent color palette defined in `src/constants/colors.js`.

---

## 📦 Project Structure & Technologies

### Core Technologies

| Technology                           | Purpose                                                  |
| :----------------------------------- | :------------------------------------------------------- |
| **React Native / Expo**              | Foundation for cross-platform development.               |
| **`expo-notifications`**             | Manages scheduling, permissions, and deep-link handling. |
| **`@react-navigation/native-stack`** | Handles screen navigation.                               |
| **`react-native-webview`**           | Component for embedding live web content.                |
| **`expo-av`**                        | Provides the `Video` component for HLS media playback.   |

### File Breakdown

| File                                   | Description                                                                                                                                                                   |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `App.js`                               | Main component. Sets up the **Navigation Stack**, registers notification permissions, and initializes the **Deep Link Listener** (`addNotificationResponseReceivedListener`). |
| `src/screens/HomeScreen.js`            | Displays the **WebView** and provides buttons to test simple and deep-linking **Notifications**.                                                                              |
| `src/screens/VideoScreen.js`           | Contains the **Custom HLS Video Player** and its control logic using the `Video` component ref.                                                                               |
| `src/services/scheduleNotification.js` | Reusable service function to schedule notifications with a customizable delay and `data` payload.                                                                             |
| `src/components/ModernButton.js`       | Reusable, gradient-styled button component using `expo-linear-gradient`.                                                                                                      |

---

## 🚀 Get Started

npm install

npm run android

### Prerequisites

Ensure you have **Node.js**, **npm/yarn**, and the **Expo CLI** installed globally.

```bash
npm install -g expo-cli
```
