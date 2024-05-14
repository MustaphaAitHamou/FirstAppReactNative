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
    backgroundColor: '#FAF9F6',  // Soft cream color for a gentle and calming background
    padding: 20,  // Padding around the container to give content a spacious feel
    alignItems: 'center',  // Align items in the center to ensure a tidy layout
  },
  item: {
    backgroundColor: '#FFFFFF',  // Pure white background for each post item to enhance readability
    borderRadius: 10,  // Smooth rounded corners for a modern and friendly look
    padding: 20,  // Generous padding within each item to create a distinct and tactile area for interaction
    marginVertical: 12,  // Sufficient vertical margin between items to avoid visual clutter
    shadowColor: '#000',  // Black shadow for contrast and visibility
    shadowOffset: { width: 0, height: 4 },  // Shadow offset for a subtle elevation effect
    shadowOpacity: 0.15,  // Slightly stronger shadow opacity for depth without overpowering
    shadowRadius: 8,  // Increased radius for a softer shadow spread
    elevation: 5,  // Elevated visual effect for Android devices
  },
  itemTitle: {
    fontSize: 20,  // Slightly larger font size for clear title visibility
    fontWeight: '600',  // Medium-bold weight to emphasize title without dominating
    color: '#333333',  // Dark gray for solid readability against the white background
    marginBottom: 8,  // Defined space below the title to separate from text cleanly
  },
  link: {
    backgroundColor: '#E2E8F0',  // Light gray background for the link button to differentiate from other text
    paddingVertical: 12,  // Vertical padding to increase touch target size
    paddingHorizontal: 20,  // Horizontal padding to maintain a balanced look
    marginTop: 15,  // Top margin to separate from other elements
    borderRadius: 5,  // Mildly rounded corners for the link for a cohesive design
    fontSize: 16,  // Appropriate font size for clear legibility
    fontWeight: 'bold',  // Bold font weight to highlight interactive elements
    color: '#1E90FF',  // Vivid blue color to indicate interactivity
    textAlign: 'center',  // Center-aligned text to ensure aesthetic alignment
    textTransform: 'uppercase',  // Uppercase text for a bit of typographic variety and emphasis
    shadowColor: '#000',  // Shadow color for the link for slight visual depth
    shadowOpacity: 0.1,  // Minimal shadow opacity for subtle effect
    shadowRadius: 3,  // Small shadow radius to keep the button's shadow refined
    shadowOffset: { width: 0, height: 1 },  // Minimal shadow offset to lift the button visually
  }
});
