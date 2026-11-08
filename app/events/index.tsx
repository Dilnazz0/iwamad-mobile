import { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import { EventRow } from '../../src/components/EventRow';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
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

  const filteredEvents = data.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSave = (id: number) => {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>
      <TextInput
        style={styles.search}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  hint: {
    marginBottom: 16,
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
  },
  search: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 10,
    textAlign: 'center',
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
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#9ca3af',
    fontSize: 16,
    fontStyle: 'italic',
  },
});