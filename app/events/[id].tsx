import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text style={styles.text}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.text}>{error.message}</Text>
        <Pressable 
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
          onPress={() => refetch()}
        >
          {isRefetching ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Try again</Text>
          )}
        </Pressable>
      </View>
    );
  }

  const event = data.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Event not found</Text>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
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
  text: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b91c1c',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#7c3aed',
    padding: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#6d28d9',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});