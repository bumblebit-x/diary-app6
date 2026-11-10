import { useState, useEffect, useMemo } from 'react';
import { DiaryEntry } from '../context/DiaryContext';

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredEntries = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchText =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q);

      const matchMood = selectedMood ? entry.mood === selectedMood : true;

      return matchText && matchMood;
    });
  }, [entries, debouncedQuery, selectedMood]);

  const resetFilters = () => {
    setQuery('');
    setSelectedMood(null);
  };

  return {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    resetFilters,
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
