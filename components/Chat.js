import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const { name, background, userID } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }

    // Customize speech bubble
    const renderBubble = (props) => {
      return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#757083"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
    }

    // Set user name
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    // Messages database
    
    useEffect(() => {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, (documentSnapshot) => {
          let newMessages = [];
          documentSnapshot.forEach(doc => {
            newMessages.push({ 
              id: doc.id, 
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            })
          });
          setMessages(newMessages);
      });

      // Clean up code
      return () => {
        if (unsubMessages) unsubMessages();
      }
    }, []);
      
    return (
        <View style={[styles.container, {backgroundColor: background}]}>
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              onSend={messages => onSend(messages)}
              user={{
                //_id: route.params.id,
                _id: userID,
                name
              }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
        )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
});

export default Chat;