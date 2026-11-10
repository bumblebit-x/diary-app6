import React from 'react';
import { Stack } from 'expo-router';
import { DiaryProvider } from '../src/context/DiaryContext';

export default function RootLayout() {
  return (
    <DiaryProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#0F172A',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[id]" options={{ title: 'Detail Diary' }} />
      </Stack>
    </DiaryProvider>
  );
}
