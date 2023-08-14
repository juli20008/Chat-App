import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route }) => {
    const { name, backgroundColor } = route.params;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.heading}>Chat Room</Text>
      <Text style={styles.userName}>User: {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
  },
});

export default Chat;