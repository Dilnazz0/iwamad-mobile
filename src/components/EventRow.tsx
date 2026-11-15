import { Pressable, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  isSaved: boolean;
};

export function EventRow({ event, onPress, onToggleSaved, isSaved }: Props) {
  return (
    <Animated.View
      style={styles.rowWrapper}
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        containerStyle={styles.swipeContainer}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>
              {isSaved ? 'Unsave' : 'Save'}
            </Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>

          <Text style={styles.info}>
            {event.date} — {event.place}
          </Text>

          {isSaved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    marginBottom: 12,
  },
  swipeContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#7c3aed',
  },
  card: {
    padding: 20,
    minHeight: 44,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardPressed: {
    backgroundColor: '#f3f0ff',
    transform: [{ scale: 0.98 }],
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
  action: {
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    minHeight: 44,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});