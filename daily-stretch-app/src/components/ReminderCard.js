import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

const TIME_SLOTS = [
  { id: 'sunrise', label: '晨間喚醒', detail: '06:45', hour: 6, minute: 45 },
  { id: 'lunch', label: '午休 reset', detail: '12:30', hour: 12, minute: 30 },
  { id: 'evening', label: '晚間放鬆', detail: '20:30', hour: 20, minute: 30 },
];

const ReminderCard = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const scheduleSlot = async (slot) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      let permission = await Notifications.getPermissionsAsync();
      if (permission.status !== 'granted') {
        permission = await Notifications.requestPermissionsAsync();
      }

      if (permission.status !== 'granted') {
        setErrorMessage('需要通知權限才能提醒你練習。請在手機系統設定中開啟。');
        setStatus('idle');
        return;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('daily-reset', {
          name: 'Daily Pelvic Tilt Reminder',
          importance: Notifications.AndroidImportance.HIGH,
        });
      }

      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '該做 Daily Pelvic Tilt Reset 囉 ✨',
          body: '按照 Tone and Tighten 的 5 個動作，幫骨盆回到中立位！',
          sound: 'default',
        },
        trigger: {
          hour: slot.hour,
          minute: slot.minute,
          repeats: true,
          channelId: 'daily-reset',
        },
      });

      setSelectedSlot(slot.id);
      setStatus('scheduled');
    } catch (error) {
      console.warn('Unable to schedule reminder', error);
      setErrorMessage('無法設定提醒，請再試一次或檢查網路/權限。');
      setStatus('idle');
    }
  };

  const activeSlot = TIME_SLOTS.find((slot) => slot.id === selectedSlot);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>每日提醒</Text>
        <Text style={styles.status}>
          {status === 'scheduled' && activeSlot ? `已排程：${activeSlot.detail}` : '尚未設定'}
        </Text>
      </View>
      <Text style={styles.description}>
        選擇一個時間，手機會每天提醒你按 YouTube 動作完成整套伸展。
      </Text>
      <View style={styles.slotRow}>
        {TIME_SLOTS.map((slot) => {
          const active = selectedSlot === slot.id;
          return (
            <Pressable
              key={slot.id}
              style={[styles.slotButton, active && styles.slotButtonActive]}
              onPress={() => scheduleSlot(slot)}
            >
              <Text style={[styles.slotLabel, active && styles.slotLabelActive]}>{slot.label}</Text>
              <Text style={[styles.slotDetail, active && styles.slotLabelActive]}>{slot.detail}</Text>
            </Pressable>
          );
        })}
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(2,6,23,0.8)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.3)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  status: {
    color: '#a5f3fc',
    fontSize: 13,
  },
  description: {
    color: '#cbd5f5',
    marginTop: 8,
    lineHeight: 20,
  },
  slotRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  slotButton: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    backgroundColor: 'rgba(15,23,42,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.3)',
    alignItems: 'center',
  },
  slotButtonActive: {
    borderColor: '#22d3ee',
    backgroundColor: 'rgba(45,212,191,0.15)',
  },
  slotLabel: {
    color: '#f8fafc',
    fontWeight: '600',
  },
  slotLabelActive: {
    color: '#22d3ee',
  },
  slotDetail: {
    marginTop: 4,
    color: '#94a3b8',
  },
  error: {
    marginTop: 12,
    color: '#f87171',
  },
});

export default ReminderCard;
