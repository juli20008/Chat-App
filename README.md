# Chat App

Welcome to the Chat App project! This repository contains the source code for a mobile application built using React Native. The app's main focus is to provide users with a chat interface along with the ability to share images and their location.

## Technologies Used

- React Native
- Expo (toolchain for building native apps in JavaScript)
- React Native Gifted Chat library
- Google Firestore DB
- Google Firebase Authentication
- AsyncStorage caching for offline use
- Firebase Cloud Storage (for storing images)
- Expo ImagePicker & MediaLibrary for communication features

## Key Features

The Chat App offers the following features:

1. **User Profile Setup:** Users can set their display name and choose a background color for the chat screen before entering the chat.
2. **Chat Interface:** The app displays the conversation thread, an input field, and a submit button.
3. **Communication Options:** Users can send images and share location data within the chat.
4. **Data Persistence:** Messages and other data are stored both online and offline, ensuring a seamless experience.

## Getting Started

Follow these steps to set up the application:

1. Ensure your Node.js version is compatible with Expo:

   ```bash
   npm install 16.19.0
   npm use 16.19.0
   npm alias default 16.19.0
