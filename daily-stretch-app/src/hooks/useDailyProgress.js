import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'daily-stretch-progress-v1';

const toLocalDateKey = (date = new Date()) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - tzOffset);
  return local.toISOString().split('T')[0];
};

const toDate = (key) => {
  if (!key) return null;
  const [year, month, day] = key.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const isYesterday = (lastKey, currentKey) => {
  if (!lastKey || !currentKey) return false;
  const diffMs = toDate(currentKey) - toDate(lastKey);
  return Math.round(diffMs / 86400000) === 1;
};

const createFreshState = () => ({
  todayKey: toLocalDateKey(),
  completed: {},
  streak: 0,
  lastFullCompletionDate: null,
});

const persistState = async (snapshot) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.warn('Unable to persist progress', error);
  }
};

const sanitizeLoadedState = (raw) => {
  if (!raw) return createFreshState();
  try {
    const parsed = JSON.parse(raw);
    return {
      ...createFreshState(),
      ...parsed,
    };
  } catch {
    return createFreshState();
  }
};

export default function useDailyProgress(exercises) {
  const [progress, setProgress] = useState(createFreshState);
  const [isLoaded, setIsLoaded] = useState(false);

  const totalExercises = exercises.length;

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = sanitizeLoadedState(stored);
        const todayKey = toLocalDateKey();
        if (parsed.todayKey !== todayKey) {
          parsed.todayKey = todayKey;
          parsed.completed = {};
        }
        setProgress(parsed);
      } finally {
        setIsLoaded(true);
      }
    };

    loadProgress();
  }, []);

  const updateProgress = useCallback((recipe) => {
    setProgress((current) => {
      const next = recipe(current);
      persistState(next);
      return next;
    });
  }, []);

  const toggleExercise = useCallback(
    (exerciseId) => {
      updateProgress((current) => {
        const completed = {
          ...current.completed,
          [exerciseId]: !current.completed[exerciseId],
        };
        const completedCount = exercises.filter((ex) => completed[ex.id]).length;
        const allDone = completedCount === totalExercises;

        let streak = current.streak;
        let lastFullCompletionDate = current.lastFullCompletionDate;

        if (allDone && current.lastFullCompletionDate !== current.todayKey) {
          if (isYesterday(current.lastFullCompletionDate, current.todayKey)) {
            streak += 1;
          } else {
            streak = 1;
          }
          lastFullCompletionDate = current.todayKey;
        } else if (!allDone && current.lastFullCompletionDate === current.todayKey) {
          lastFullCompletionDate = null;
          streak = Math.max(0, streak - 1);
        }

        return {
          ...current,
          completed,
          streak,
          lastFullCompletionDate,
        };
      });
    },
    [exercises, totalExercises, updateProgress],
  );

  const resetDay = useCallback(() => {
    updateProgress((current) => ({
      ...current,
      completed: {},
      lastFullCompletionDate: null,
    }));
  }, [updateProgress]);

  const analytics = useMemo(() => {
    const completedIds = Object.keys(progress.completed).filter((key) => progress.completed[key]);
    const completedCount = completedIds.length;
    const progressPercent = totalExercises
      ? Math.round((completedCount / totalExercises) * 100)
      : 0;
    return {
      completedCount,
      progressPercent,
      allDone: completedCount === totalExercises && totalExercises > 0,
    };
  }, [progress.completed, totalExercises]);

  return {
    isLoaded,
    todayKey: progress.todayKey,
    streak: progress.streak,
    completedMap: progress.completed,
    toggleExercise,
    resetDay,
    ...analytics,
  };
}
