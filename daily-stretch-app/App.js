import { useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import exercises, { routineMetadata } from './src/data/routine';
import useDailyProgress from './src/hooks/useDailyProgress';
import ExerciseCard from './src/components/ExerciseCard';
import ReminderCard from './src/components/ReminderCard';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const {
    isLoaded,
    completedMap,
    progressPercent,
    completedCount,
    toggleExercise,
    streak,
    resetDay,
    allDone,
  } = useDailyProgress(exercises);

  const totalExercises = exercises.length;

  const motivation = useMemo(() => {
    if (allDone) return '太棒了！今天的骨盆 reset 已完成 ✅';
    if (progressPercent >= 60) return '剩最後幾個動作，保持骨盆中立！';
    return '跟著影片節奏，慢慢重置骨盆、核心與臀肌。';
  }, [allDone, progressPercent]);

  const handleVideo = async () => {
    try {
      await Linking.openURL(routineMetadata.videoUrl);
    } catch (error) {
      console.warn('Unable to open video', error);
    }
  };

  if (!isLoaded) {
    return (
      <LinearGradient colors={['#020617', '#0f172a']} style={styles.loadingContainer}>
        <StatusBar style="light" />
        <Text style={styles.loadingText}>載入專屬伸展中...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#020617', '#0f172a']} style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.appEyebrow}>Daily Stretch • 骨盆前傾改善</Text>
            <Text style={styles.heroTitle}>{routineMetadata.title}</Text>
            <Text style={styles.heroSubtitle}>{routineMetadata.subtitle}</Text>
            <View style={styles.statRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>完成度</Text>
                <Text style={styles.statValue}>{progressPercent}%</Text>
                <Text style={styles.statDetail}>
                  {completedCount}/{totalExercises} 動作
                </Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>連續天數</Text>
                <Text style={styles.statValue}>{streak}</Text>
                <Text style={styles.statDetail}>目標 21 天肌力再教育</Text>
              </View>
            </View>
            <Text style={styles.motivation}>{motivation}</Text>
            <View style={styles.heroButtons}>
              <Pressable style={styles.videoButton} onPress={handleVideo}>
                <Text style={styles.videoButtonText}>開啟完整影片</Text>
              </Pressable>
              {completedCount > 0 ? (
                <Pressable style={styles.resetButton} onPress={resetDay}>
                  <Text style={styles.resetButtonText}>重新計算今天</Text>
                </Pressable>
              ) : null}
            </View>
          </View>

          <ReminderCard />

          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              completed={!!completedMap[exercise.id]}
              onToggle={() => toggleExercise(exercise.id)}
            />
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerTitle}>如何部署到手機？</Text>
            <Text style={styles.footerText}>
              1. 先在電腦上執行 <Text style={styles.code}>npm run start</Text>，並掃描 QR code
              開啟 Expo Go。
            </Text>
            <Text style={styles.footerText}>
              2. 若要安裝成獨立 App，可在 Expo 中點選 “Build” 產生 Android APK 或 iOS
              測試連結，照指示安裝即可每天開啟使用。
            </Text>
            <Text style={styles.footerText}>
              3. 記得允許通知權限，確保 Reminder 卡片能準時提醒。
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#f8fafc',
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
    gap: 24,
  },
  hero: {
    backgroundColor: 'rgba(15,23,42,0.85)',
    padding: 20,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
  },
  appEyebrow: {
    color: '#a5f3fc',
    letterSpacing: 2,
    fontSize: 12,
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 8,
  },
  heroSubtitle: {
    color: '#cbd5f5',
    marginTop: 6,
    lineHeight: 20,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(8,47,73,0.8)',
  },
  statLabel: {
    color: '#7dd3fc',
    fontSize: 12,
    letterSpacing: 1,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  statDetail: {
    color: '#94a3b8',
    marginTop: 4,
    fontSize: 12,
  },
  motivation: {
    color: '#e2e8f0',
    marginTop: 16,
    lineHeight: 20,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  videoButton: {
    flex: 1,
    backgroundColor: '#f97316',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  videoButtonText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(248,250,252,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
  },
  footerTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
  },
  footerText: {
    color: '#cbd5f5',
    marginBottom: 8,
    lineHeight: 20,
  },
  code: {
    fontFamily: 'monospace',
  },
});
