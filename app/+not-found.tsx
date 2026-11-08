import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>
      <Link href="/" style={styles.link}>Go home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  link: { color: '#7c3aed', fontSize: 16 },
});