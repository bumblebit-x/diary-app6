import React, { useCallback, useRef } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { useDiarySearch } from '../../src/hooks/useDiarySearch';
import DiaryCard from '../../src/components/DiaryCard';
import { COLORS, SPACE, TYPO, RADIUS } from '../../src/styles/tokens';

const MOOD_OPTIONS = ['😊', '🎯', '😌', '🥳'];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    resetFilters,
    filteredEntries,
    resultCount,
  } = useDiarySearch(entries);

  const searchRef = useRef<TextInput>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: { id: String(id) },
      });
    },
    [router]
  );

  const handleReset = useCallback(() => {
    resetFilters();
    searchRef.current?.focus();
  }, [resetFilters]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary atau tanggal..."
          placeholderTextColor={COLORS.muted}
          style={styles.search}
        />
        {(query.length > 0 || selectedMood !== null) && (
          <Pressable onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodRow}>
          <Pressable
            onPress={() => setSelectedMood(null)}
            style={[styles.moodChip, selectedMood === null && styles.moodChipActive]}
          >
            <Text style={[styles.moodChipText, selectedMood === null && styles.moodChipTextActive]}>
              Semua
            </Text>
          </Pressable>
          {MOOD_OPTIONS.map((mood) => (
            <Pressable
              key={mood}
              onPress={() => setSelectedMood(selectedMood === mood ? null : mood)}
              style={[styles.moodChip, selectedMood === mood && styles.moodChipActive]}
            >
              <Text style={styles.moodChipEmoji}>{mood}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>Diary tidak ditemukan.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: 52,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: SPACE.m,
  },
  searchRow: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  search: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACE.m,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: TYPO.body,
  },
  resetButton: {
    height: 46,
    paddingHorizontal: SPACE.l,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resetButtonText: {
    color: COLORS.text,
    fontSize: TYPO.body,
    fontWeight: '600',
  },
  filterContainer: {
    marginTop: SPACE.m,
  },
  moodRow: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  moodChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodChipActive: {
    backgroundColor: COLORS.chipActiveBg,
    borderColor: COLORS.accent,
  },
  moodChipText: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    fontWeight: '600',
  },
  moodChipTextActive: {
    color: COLORS.accent,
  },
  moodChipEmoji: {
    fontSize: 16,
  },
  counter: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
    fontWeight: '500',
    marginVertical: SPACE.m,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: 40,
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: 'center',
  },
  empty: {
    color: COLORS.muted,
    fontSize: TYPO.body,
  },
});
