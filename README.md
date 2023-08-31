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

- **User Profile Setup:** Users can set their display name and choose a background color for the chat screen before entering the chat.
- **Chat Interface:** The app displays the conversation thread, an input field, and a submit button.
- **Communication Options:** Users can send images and share location data within the chat.
- **Data Persistence:** Messages and other data are stored both online and offline, ensuring a seamless experience.

## Getting Started

Follow these steps to set up the application:

```shell
# Install Expo CLI globally
npm install -g expo-cli

# Create an Expo account at https://expo.dev/ and install Expo Go app
# on your smartphone or set up a virtual machine on your computer.

# Create a new React Native project using Expo
npx create-expo-app ChattyApp --template

# Start Expo
npm start

# Install the required dependency to fix image sending issues
npm i whatwg-fetch@3.6.2

# Sync the Metro Bundler with your smartphone using Expo Go app
# or an emulator to preview the app.

## Database Configuration

If you want to use your own database:

1. Create a new database on [Firebase](https://firebase.google.com/) (sign up required).
2. Install Firebase:

```shell
npm i firebase
