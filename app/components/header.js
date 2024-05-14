import React, {useState, useEffect} from "react";
import "../../firebaseConfig"
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
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
    router.replace('/signin');
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#2C3E50',
        paddingTop: 10,
      },
      link: {
        color: '#BBBBBB',  // Light grey for inactive links
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      activeLink: {
        color: '#FFFFFF',  // White for active link
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      logoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
      }
    });