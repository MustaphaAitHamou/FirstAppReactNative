import React from "react"
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import { Link } from "expo-router";
import { signin } from "../Firebase/auth_signin_password.js";
import { loginWithPhoneNumber } from "../Firebase/auth_phone_signin.js";
import { verifyCode } from "../Firebase/auth_phone_verify_code.js";

export default function App() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState(""); 
  const [phoneNumber, onChangePhoneNumber] = React.useState("");
  const [code, onChangeCode] = React.useState("");
  
  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <Link href="signup">Pas encore de compte ? Inscrivez-vous !</Link>
      <Button title="Sign In!" onPress={() => signin(email, password)} />

      <Text>___Phone___</Text>
      <Text>Phone number</Text>
      <TextInput
      style={styles.input}
      onChangeText={onChangePhoneNumber}
      value={phoneNumber}
      ></TextInput>
      <Pressable id="sign-in-button-phone" onPress={() => loginWithPhoneNumber(phoneNumber)} style = {styles.button} >
        <Text>Sign In with phone</Text>
        
      </Pressable>
      <div id="recaptcha-container"></div>
      <Text>Code</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCode}
        value={code}
      ></TextInput>
      <Pressable onPress={() => verifyCode(code)} style = {styles.button}>
        <Text>Check code !</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',  // Light grey background for a clean and modern look
    alignItems: 'center',  // Center items horizontally
    justifyContent: 'center',  // Center items vertically
    padding: 20,  // Padding around the container
  },
  input: {
    width: '90%',  // Responsive width
    height: 50,  // Standard height for easy interaction
    backgroundColor: '#FFFFFF',  // White background for the input fields
    borderWidth: 1,
    borderColor: '#D1D5DB',  // Soft grey border
    borderRadius: 10,  // Rounded corners
    padding: 10,  // Padding inside the input
    marginBottom: 15,  // Margin below each input
    fontSize: 16,  // Font size
    color: '#1F2937',  // Dark grey text for better readability
  },
  button: {
    backgroundColor: '#3B82F6',  // Bright blue for buttons
    padding: 15,  // Padding inside the button
    borderRadius: 10,  // Rounded corners for the button
    alignItems: 'center',  // Align text in the center of the button
    width: '90%',  // Responsive width matching the inputs
    marginTop: 10,  // Margin on top of the button
  },
  buttonText: {
    color: '#FFFFFF',  // White text for high contrast on the button
    fontSize: 16,  // Font size for button text
    fontWeight: 'bold',  // Bold text for better visibility
  },
  separator: {
    marginVertical: 20,  // Margin vertically for separator
    width: '80%',  // Width for the separator
    borderBottomColor: '#E5E7EB',  // Light grey border color
    borderBottomWidth: 1,  // Border bottom thickness
  }
});

