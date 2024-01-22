import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [background, setBackground] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    return (
        <ImageBackground source={require('../img/BackgroundImage.png')} style={styles.bgImage} resizeMode="cover">
            <Text style={styles.appTitle}>Welcome!</Text>
            <View style={styles.box}>
                {/* Input user name \*/}
                <TextInput
                    accessibilityLabel="Username input"
                    accessibilityRole="text"
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type your username here'
                />
                <Text style={styles.chooseBackgroundColor}>Choose Background Color</Text>
                {/* Choose background color of chat \*/}
                <View style={styles.colorButtonsBox}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            accessibilityLabel="Color Button"
                            accessibilityHint="Lets you choose a backgroundcolor for your chat."
                            accessibilityRole="button"
                            key={index}
                            style={[styles.colorButton, { backgroundColor: color }, background === color && styles.selected]}
                            onPress={() => setBackground(color)}
                        />
                    ))}
                </View>
                {/* Start Chat \*/}
                <TouchableOpacity
                    accessibilityLabel="Start Chatting"
                    accessibilityRole="button"
                    style={styles.button}
                    onPress={() => navigation.navigate('Chat', { name: name, background: background })}>
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    box: {
        backgroundColor: '#ffffff',
        width: '88%',
        height: '44%',
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'space-evenly',
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        width: '88%',
        opacity: 50,
        padding: 15,
        borderWidth: 1,
        marginTop: '8%',
        marginBottom: 15,
        top: 5,
        borderColor: '#757083',
    },
    chooseBackgroundColor: {
        flex: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        marginTop: 20,
    },
    colorButtonsBox: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: "space-between",
        top: 5,
        bottom: 5
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10
    },
    selected: {
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        backgroundColor: '#757083',
        padding: 15,
        margin: 20,
        alignItems: 'center',
        width: '88%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    }
});

export default Start;