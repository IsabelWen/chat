import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from "@react-native-community/netinfo";
import { StyleSheet, LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCKurxYwWqtW6SStZM1hJvxDUkgibCOVic",
    authDomain: "chatapp-22e16.firebaseapp.com",
    projectId: "chatapp-22e16",
    storageBucket: "chatapp-22e16.appspot.com",
    messagingSenderId: "742011145227",
    appId: "1:742011145227:web:624ed83922809ac1564b0e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app)

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
            {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;