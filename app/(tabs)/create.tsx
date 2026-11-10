import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

const MOODS = ['😊', '🎯', '😌', '🥳'];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-02');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('😊');

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80),
      body: body.trim(),
      mood,
    });

    setTitle('');
    setBody('');
    setMood('😊');
    router.replace('/');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tulis Diary Baru</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Judul</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Beri judul harimu..."
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tanggal</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mood Hari Ini</Text>
        <View style={styles.moodRow}>
          {MOODS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setMood(item)}
              style={[styles.moodButton, mood === item && styles.moodSelected]}
            >
              <Text style={styles.moodEmoji}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cerita Lengkap</Text>
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Tuangkan isi pikiranmu..."
          placeholderTextColor={COLORS.muted}
          multiline
          style={[styles.input, styles.bodyInput]}
        />
      </View>

      <Pressable
        onPress={save}
        disabled={!canSave}
        style={[styles.saveButton, !canSave && styles.disabled]}
      >
        <Text style={styles.saveText}>Simpan Catatan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: SPACE.l,
    paddingTop: 52,
    paddingBottom: 40,
    gap: SPACE.l,
  },
  heading: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontSize: TYPO.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACE.m,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: TYPO.body,
  },
  bodyInput: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  moodRow: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  moodButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  moodSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.chipActiveBg,
  },
  moodEmoji: {
    fontSize: 24,
  },
  saveButton: {
    paddingVertical: 14,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACE.s,
  },
  disabled: {
    opacity: 0.5,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: TYPO.body,
  },
});
