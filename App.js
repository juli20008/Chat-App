//App.js
import React from 'react';
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { LogBox, Alert } from 'react-native';
// Create the navigator
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
// TODO: Add SDKs for Firebase products that you want to use

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  
  const firebaseConfig = {
    apiKey: "AIzaSyBdSeoPR7lLSoSe4ylaiB02KCx-NqfCNcg",
    authDomain: "chatapp-f3de2.firebaseapp.com",
    projectId: "chatapp-f3de2",
    storageBucket: "chatapp-f3de2.appspot.com",
    messagingSenderId: "216035558568",
    appId: "1:216035558568:web:8c4c03e81d13db07106e9d"
  };
   // Initialize Firebase
  const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
  //  const db = firestore(app); // Initialize Firestore
    const db = getFirestore(app);
    const storage = getStorage(app);



    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>  
    );
  }

export default App;