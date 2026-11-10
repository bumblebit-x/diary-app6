import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.settingLabel}>Compact Mode</Text>
            <Text style={styles.settingDesc}>Tampilkan daftar lebih padat</Text>
          </View>
          <Switch
            value={compactMode}
            onValueChange={setCompactMode}
            trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
            thumbColor={compactMode ? COLORS.accent : '#F8FAFC'}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.info}>
          Status: <Text style={styles.infoValue}>{compactMode ? 'Aktif' : 'Nonaktif'}</Text>
        </Text>
      </View>
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
  title: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: SPACE.l,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: TYPO.title,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingDesc: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.m,
  },
  info: {
    color: COLORS.muted,
    fontSize: TYPO.body,
  },
  infoValue: {
    color: COLORS.text,
    fontWeight: '700',
  },
});
