import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { getPostData } from "../Firebase/get_post_data";

export default function App() {

const [post, setPost] = useState([])
useEffect(() => {
  const fetchData = async () => {
    const data = await getPostData();
    console.log(data);
    setPost(data); 
  }
  fetchData();
}, [])

  return (
    <View style={styles.container}>
      <Text>Bienvenue</Text>
      <Link href="add_post">Créer un nouveau post</Link>
      {post.map((p) => {
        return (
          <View key={p.id} style={styles.item}>
            <Text style={styles.itemTitle}>{p.title}</Text>
            <Text>{p.text}</Text>
          </View>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',  // Soft cream background for a gentle feel
    padding: 20,  // Padding around the container for spacing
  },
  item: {
    backgroundColor: '#FFFFFF',  // White background for each item for clarity
    borderRadius: 8,  // Rounded corners for a modern look
    padding: 15,  // Padding within each item for layout
    marginVertical: 10,  // Vertical spacing between items
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 2 },  // Shadow offset for a slight elevation effect
    shadowOpacity: 0.1,  // Subtle shadow for depth
    shadowRadius: 6,  // Soft shadow spread
    elevation: 3,  // Elevation for Android
  },
  itemTitle: {
    fontSize: 18,  // Larger font size for titles for emphasis
    fontWeight: 'bold',  // Bold font weight for the titles
    color: '#333',  // Dark gray for high contrast and readability
    marginBottom: 5,  // Margin below the title for separation
  },
  link: {
    padding: 10,  // Padding for the link for easier tapping
    marginTop: 10,  // Margin top for spacing from welcome text
    color: '#1E90FF',  // Bright blue color for the link for visibility
    fontSize: 16,  // Font size for the link
    fontWeight: 'bold',  // Bold font weight for the link
    textAlign: 'center',  // Center text alignment for the link
  }
});

