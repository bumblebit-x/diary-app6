import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();

  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);

  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.mood}>{entry.mood}</Text>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.date}>{entry.date}</Text>
        </View>

        <View style={styles.bodyCard}>
          <Text style={styles.body}>{entry.body}</Text>
        </View>

        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={[styles.likeButton, liked && styles.likeButtonActive]}
        >
          <Text style={[styles.likeText, liked && styles.likeTextActive]}>
            {liked ? '❤️ Disukai' : '🤍 Sukai Catatan Ini'}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  headerCard: {
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  mood: {
    fontSize: 54,
    marginBottom: SPACE.s,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 4,
  },
  bodyCard: {
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  body: {
    fontSize: TYPO.body,
    lineHeight: 24,
    color: COLORS.text,
  },
  likeButton: {
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButtonActive: {
    borderColor: '#FECDD3',
    backgroundColor: '#FFF1F2',
  },
  likeText: {
    fontWeight: '700',
    fontSize: TYPO.body,
    color: COLORS.muted,
  },
  likeTextActive: {
    color: COLORS.danger,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: COLORS.muted,
    fontSize: TYPO.body,
  },
});
