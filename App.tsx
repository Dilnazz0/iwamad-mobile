import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello, World!</Text>
        <Text style={styles.name}>Dilnaz Yeshmukhambet</Text>

        <Text style={styles.likes}>Likes: {likes}</Text>
        
        <Pressable 
          onPress={() => setLikes(likes + 1)} 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <Text style={styles.buttonText}>Like</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 32,
  },
  likes: {
    fontSize: 24,
    fontWeight: '600',
    color: '#7c3aed', 
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 999,
    minHeight: 44,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#6d28d9', 
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});