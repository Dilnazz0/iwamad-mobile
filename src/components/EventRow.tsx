import { Pressable, Text, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  isSaved: boolean;
};

export function EventRow({ event, onPress, onLongPress, isSaved }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>{event.date} — {event.place}</Text>
      {isSaved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    minHeight: 44,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardPressed: {
    backgroundColor: '#f3f0ff',
    transform: [{ scale: 0.98 }],
    borderColor: '#ddd6fe',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  info: {
    color: '#6b7280',
    marginTop: 6,
    fontSize: 14,
  },
  saved: {
    color: '#7c3aed',
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
});