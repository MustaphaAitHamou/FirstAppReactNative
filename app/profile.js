import React, { useEffect, useState } from "react";
import "../firebaseConfig";
import { Text, StyleSheet, TextInput, View, Button, Image } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../Firebase/storage_upload_file";
import { updateUserPhotoUrl } from "../Firebase/auth_update_photo_url";
import { updateProfile } from "firebase/auth";

const auth = getAuth();

export default function Profile() {
  const [user, setUser] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const { uri } = result.assets[0];
      const fileName = uri.split("/").pop();
      const uploadResp = await uploadToFirebase(uri, fileName);
      console.log(uploadResp);
      let res = await updateUserPhotoUrl(uploadResp);
      if (res) {
        console.log(res);
        setUser({ ...user, photoURL: uploadResp });
      } else {
        // An error occurred
        // ...
      }
    }
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(user);
      setUser(user);
      // ...
    } else {
      // User is signed out
      // ...
      setUser(null);
    }
  });

  
  return (
    <>
      {user ? (
        <View style={styles.container}>
          <Text>Display name : {user.displayName}</Text>
          <Text>Email : {user.email}</Text>
          <Text>phoneNumber : {user.phoneNumber}</Text>
          <Text>Profile picture :</Text>
          <Image
            style={styles.image}
            source={{
              uri: user.photoURL,
            }}
          />
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}


          <TextInput
            style={styles.input}
            onChangeText={setUser}   
          />

        <Button title="Changer le nom" onPress={() => updateProfile(auth.currentUser, { displayName: user.name }, console.log(user.name)
)} />


        </View>
      ) : (
        <View style={styles.container}>
          <Text>User not logged ... </Text>
        </View>
      )}
      
    </>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EDF2F7",  // Light blue background to create a calm and inviting atmosphere
      padding: 20,  // Padding around the container for comfortable spacing
      paddingHorizontal: 30,  // Slightly larger horizontal padding to center content effectively
    },
    text: {
      fontSize: 18,  // Clear and readable font size
      color: "#2F855A",  // Calming dark green, providing a natural and soothing color
      fontWeight: "600",  // Medium-bold weight for emphasis and accessibility
      textAlign: "center",  // Ensures text is centralized for a balanced design
      marginVertical: 10,  // Consistent vertical margin for spacing between text elements
      backgroundColor: "#ffffff",  // White background to contrast with the light blue container
      padding: 12,  // Generous padding for a tactile and easy touch interaction
      borderRadius: 8,  // Smoothly rounded corners for a soft, modern look
      borderWidth: 1,  // Subtle border to neatly frame the text
      borderColor: "#CBD5E0",  // Soft grey for the border, keeping the look gentle and unobtrusive
      width: "90%",  // Optimal width for maintaining layout integrity across device sizes
      shadowColor: "#000",  // Subtle shadow to lift the text visually off the background
      shadowOpacity: 0.1,  // Light shadow opacity for depth without dominance
      shadowRadius: 4,  // Gentle shadow spread for a soft focus effect
      elevation: 3,  // Elevation on Android for a subtle shadow effect
    },
    image: {
      width: 200,  // A balanced width for visual impact
      height: 200,  // Equal height to maintain the aspect ratio
      borderRadius: 100,  // Fully rounded corners to transform the image into a circle, enhancing visual appeal
      marginTop: 20,  // Adequate spacing above to separate from text
      marginBottom: 20,  // Adequate spacing below before the next element
      borderWidth: 3,  // Bold border to make the image pop out
      borderColor: "#4FD1C5",  // Teal color for the border to tie in with the button styling
    },
    button: {
      backgroundColor: "#4FD1C5",  // Teal color for a vibrant, actionable appearance
      paddingVertical: 12,  // Comfortable vertical padding for ease of pressing
      paddingHorizontal: 30,  // Ample horizontal padding for internal content space
      borderRadius: 25,  // Highly rounded corners for a modern, button-like appearance
      marginTop: 10,  // Space from the last component to this actionable item
      shadowColor: "#000",  // Shadow for depth
      shadowOpacity: 0.2,  // Visible but not overpowering shadow
      shadowRadius: 5,  // Soft shadow spread
      shadowOffset: { height: 2, width: 0 },  // Shadow slightly below the button for a lifted effect
      elevation: 4,  // Android-specific elevation for consistency with iOS shadow
    },
    input: {
      height: 50,  // Consistent height with other inputs for uniformity
      width: '90%',  // Matching width to maintain alignment with other components
      borderRadius: 8,  // Rounded corners to match other input styles
      borderColor: "#CBD5E0",  // Border color matching the text fields for cohesion
      borderWidth: 1,  // Consistent border width for clean edges
      paddingHorizontal: 10,  // Internal padding to keep text from the edges
      marginVertical: 12,  // Vertical margin to separate from other form elements
      backgroundColor: "#ffffff",  // White background for clear visual focus
      fontSize: 16,  // Legible font size for easy reading
      color: "#333",  // Dark gray for text to ensure it stands out against the background
      shadowColor: "#000",  // Shadow to enhance the tactile feel
      shadowOpacity: 0.1,  // Light opacity to ensure subtlety
      shadowRadius: 3,  // Smooth shadow for a soft outward spread
      elevation: 2,  // Elevation to apply shadow on Android
    }
  });