//components/Chat.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, FlatList,Text,KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";

const Chat = ({ db, route }) => {
  const { name, _id } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubMessages = onSnapshot(collection(db, "messages"), (querySnapshot) => {
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
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [db]);

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

  return (
    <View style={[ styles.container ]}>
       <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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
