import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const trimmed = text.trim();
  const isDisabled = trimmed.length === 0;

  const handleSend = () => {
    if (isDisabled) return;
    sendMessage(eventId, trimmed);
    setText('');
  };

  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a message"
          value={text}
          onChangeText={setText}
          maxLength={200}
        />
        <Pressable
          onPress={handleSend}
          disabled={isDisabled}
          style={({ pressed }) => [
            styles.sendButton,
            isDisabled && styles.sendButtonDisabled,
            pressed && !isDisabled && styles.sendButtonPressed,
          ]}
        >
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>

      {status === 'connecting' && (
        <Text style={styles.statusText}>Connecting</Text>
      )}
      {status === 'error' && (
        <Text style={styles.errorText}>Chat unavailable</Text>
      )}
      {status === 'live' && newestFirst.length === 0 && (
        <Text style={styles.statusText}>No messages yet</Text>
      )}

      {newestFirst.map((msg) => (
        <View key={msg.id} style={styles.messageRow}>
          <Text style={styles.messageText}>
            {msg.author}: {msg.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
  sendButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#6D28D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#C4B5FD',
  },
  sendButtonPressed: {
    opacity: 0.85,
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  statusText: {
    color: '#6B7280',
    fontSize: 14,
    marginVertical: 6,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginVertical: 6,
  },
  messageRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  messageText: {
    fontSize: 15,
    color: '#1F2937',
  },
});