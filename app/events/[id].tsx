import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { events } from '../../src/data/events';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.errorTitle}>Event not found</Text>
          <Text style={styles.text}>No event with id {id}.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{event.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Place:</Text>
          <Text style={styles.value}>{event.place}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Seats:</Text>
          <Text style={styles.value}>{event.seats}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 12,
  },
  label: {
    fontWeight: '600',
    color: '#6b7280',
    width: 70,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b91c1c',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
});