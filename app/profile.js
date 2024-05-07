import React, { useEffect, useState } from "react";
import "../firebaseConfig"
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from "../Firebase/storage_upload_file";
import { updateUserPhotoUrl } from "../Firebase/auth_update_photo_url";

const auth = getAuth();

export default function Profile() {
  const [user, setUser] = React.useState(null)
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
          console.log(uploadResp)
          let res = await updateUserPhotoUrl(uploadResp);
          if (res) {
              console.log(res);
              setUser({ ...user, photoURL: uploadResp })
          } else {
              // An error occurred
              // ...
          };
      }
  };

  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            console.log(user)
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
            {user ?
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
                </View>
                :
                <View style={styles.container}>
                    <Text>User not logged ... </Text>
                </View>}
        </>

    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,  // Larger font size for better readability
    color: '#2F855A',  // Dark green color for a calm, professional look
    fontWeight: 'bold',  // Bold text to highlight the user greeting
    textAlign: 'center',  // Center align text to maintain focus
    marginTop: 20,  // Margin top to give some space from the top of the screen or navbar
    padding: 10,  // Padding around the text for better touch interaction
    backgroundColor: '#EDF2F7',  // Light blue background to contrast the text color
    borderRadius: 5,  // Rounded corners for a softer, more approachable look
    borderWidth: 1,  // Thin border to define the text's boundaries
    borderColor: '#CBD5E0',  // Soft gray for the border to keep it subtle yet defined
    maxWidth: '80%',  // Limiting width to maintain text integrity on larger screens
    alignSelf: 'center',  // Align text box to center for better aesthetics on different device sizes
  },
  image: {
    width: 200,
    height: 200,
},
});

