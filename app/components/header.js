import React, {useState, useEffect} from "react";
import "../../firebaseConfig"
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState(null)
  const auth = getAuth();
  useEffect(() => {
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
  }, [])

  const logout = () => {
    signOut(auth)
  }
  return (

        <NavigationContainer independent={true}>
          <View style={styles.container}>
            <Link href="">Accueil</Link>
            {user ? <>
              <Link href="profile">Profil</Link>
              <Link style={styles.link} href="/add_post"><Text>CreatePost</Text></Link>
              <Pressable onPress={logout}>
                <Text>Déconnexion</Text>
              </Pressable>
            </> : <>
              <Link href="signin">Connexion</Link>
              <Link href="signup">Inscription</Link>
            </>}
    
          </View>
        </NavigationContainer>
      );
    }



const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',  // Align items in a horizontal row
      justifyContent: 'space-evenly',  // Even spacing of links across the navbar
      alignItems: 'center',  // Center items vertically
      height: 60,  // Fixed height for the navbar
      backgroundColor: '#2C3E50',  // Dark shade for the navbar background
      paddingTop: 10,  // Padding top to avoid overlap with the device status bar
    },
    link: {
      color: '#FFFFFF',  // White color for link text for better visibility
      fontSize: 16,  // Font size for readability
      fontWeight: 'bold',  // Bold font weight to make the links pop out
      paddingVertical: 10,  // Padding to increase touch area and comfort
      paddingHorizontal: 15,  // Horizontal padding for visual spacing
    },
  });