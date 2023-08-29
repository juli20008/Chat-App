//components/Chat.js
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage"; // Add these imports
//import { getStorage } from '@firebase/storage'; // Import the appropriate method from your Firebase storage setup 
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, FlatList,Text,KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot,query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ db, storage, route, navigation, isConnected }) => {
  const { name, userID } = route.params;
  const [messages, setMessages] = useState([]);
 // const [location, setLocation] = useState(null); // Define the location state

  // Define the storage variable
  //const storage = getStorage(); // Replace with your actual method to get the storage instance

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {

      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }    

  const onSend = async (newMessages) => {
    const message = newMessages[0];
    
    if (message.text) {
      // Handle sending text messages
      await addDoc(collection(db, "messages"), {
        text: message.text,
        createdAt: new Date(),
        user: {
          _id: userID,
          name: name
        }
      });
    }     else if (message.image) {
      // Handle sending image messages
      const imageURL = message.image;
      await uploadAndSendImage(imageURL);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };
// Define a custom InputToolbar component

const renderInputToolbar = (props) => {
  if (isConnected === true) 
  return <InputToolbar 
  {...props} />;
  else return null;
}

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} onSend={onSend} userID={userID} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[ styles.container ]}>
       <GiftedChat
        key={messages.length} // Add this key
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={onSend} // Pass the function, no need to invoke it
        renderActions={renderCustomActions} // Just pass the function, not invoking it
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#C00",
    padding: 10,
    zIndex: 1
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 10
  }
});


export default Chat;
