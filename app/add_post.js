import React, { useEffect, useState } from "react";
import "../firebaseConfig";
import { StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createPost } from "../Firebase/add_post_data";

const auth = getAuth();

export default function CreatePost() {
  const [user, setUser] = useState(null);
  const [title, onChangeTitle] = React.useState("");
  const [content, onChangeContent] = React.useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  if (user) {
    return (
      <>
        <Text>Titre</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
        ></TextInput>

        <Text>Contenu</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeContent}
          value={content}
        ></TextInput>

        <Button
          title="Créer !"
          onPress={() => createPost(title, content, user.uid)}
        />
      </>
    );
  } else {
    return (
      <>
        <Text> Pas accès, connectez-vous</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Clean white background
    alignItems: "center",
    justifyContent: "center",
    padding: 20, // Padding to avoid the edges
    fontFamily: "Arial", // Modern and readable font
  },
  input: {
    height: 50, // Slightly taller inputs for ease of use
    width: "90%", // Responsive width for better usability on different devices
    marginVertical: 10, // Vertical margin for spacing between elements
    borderWidth: 2,
    borderColor: "#007AFF", // Blue border for a touch of color
    borderRadius: 10, // Rounded corners for a softer and modern look
    padding: 10, // Internal padding for text inside the input
    fontSize: 16, // Readable text size
    color: "#333333", // Dark gray for text for better readability
  },
  button: {
    backgroundColor: "#007AFF", // Vibrant blue for a lively and modern feel
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25, // Highly rounded corners for a modern pill shape
    shadowOpacity: 0.3, // Shadow for 3D effect, increasing depth
    shadowRadius: 5, // How far the shadow spreads
    shadowColor: "#000000", // Shadow color
    shadowOffset: { height: 5, width: 0 }, // Shadow direction (only downwards)
    marginTop: 20, // Space from the input to the button
    color: "#ffffff", // Text color in the button for contrast
    fontSize: 18, // Font size for button text
    fontWeight: "bold", // Bold text for button to make it pop
  },
});
