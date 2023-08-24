//components/Chat.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, FlatList,Text,KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo"; // Assuming you're using NetInfo for connection status 

const Chat = ({ db, route }) => {
  const { name, _id } = route.params;
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // Set the initial connection status

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      if (unsubscribeNetInfo) unsubscribeNetInfo();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      const unsubMessages = onSnapshot(collection(db, "messages"), async querySnapshot => {
        const newMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.user._id,
              name: data.user.name,
              avatar: data.user.avatar,
            },
          };
        });

    // Sort messages by createdAt in descending order
    newMessages.sort((a, b) => b.createdAt - a.createdAt);
      setMessages(newMessages);

            // Cache messages in AsyncStorage
            try {
              await AsyncStorage.setItem('cachedMessages', JSON.stringify(newMessages));
            } catch (error) {
              console.log(error.message);
            }
          });


      return () => {
            if (unsubMessages) unsubMessages();
          };
        } else {
          // Load cached messages from AsyncStorage
          AsyncStorage.getItem('cachedMessages')
            .then(cachedMessages => {
              if (cachedMessages) {
                setMessages(JSON.parse(cachedMessages));
              }
            })
            .catch(error => {
              console.log(error.message);
            });
        }
      }, [db, isConnected]);
    

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }


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

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  return (
    <View style={[ styles.container ]}>
       <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar} // Add this line
        onSend={(messages) => onSend(messages)}
        user={{
          _id: _id,
          name: name,
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
