import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { useLikedEntries } from '../../src/hooks/useLikedEntries';
import DiaryCard from '../../src/components/DiaryCard';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function FavoritesScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const { favoriteEntries, favoriteCount } = useLikedEntries(entries, likedIds);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: { id: String(id) },
      });
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catatan Favorit</Text>
      <Text style={styles.counter}>{favoriteCount} catatan disukai</Text>

      <FlatList
        data={favoriteEntries}
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
            <Text style={styles.empty}>Belum ada catatan yang kamu sukai.</Text>
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
  },
  counter: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
    marginTop: 4,
    marginBottom: SPACE.m,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: 40,
  },
  emptyContainer: {
    paddingTop: 80,
    alignItems: 'center',
  },
  empty: {
    color: COLORS.muted,
    fontSize: TYPO.body,
  },
});
