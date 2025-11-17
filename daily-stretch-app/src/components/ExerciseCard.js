import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import AnimatedDemo from './AnimatedDemo';

const ExerciseCard = ({ exercise, completed, onToggle }) => {
  const { title, category, summary, instructions, demoVariant, video, holdSeconds, reps, sets, focus } =
    exercise;

  const statLabel = holdSeconds
    ? `${holdSeconds}s • ${sets} 組`
    : `${reps} 次 • ${sets} 組`;

  const handleVideo = async () => {
    try {
      await Linking.openURL(video.url);
    } catch (error) {
      console.warn('Unable to open video', error);
    }
  };

  return (
    <View style={[styles.card, completed && styles.cardCompleted]}>
      <View style={styles.cardHeader}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{focus}</Text>
        </View>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{category.toUpperCase()}</Text>
          </View>
          <View style={styles.tagSecondary}>
            <Text style={styles.tagSecondaryText}>{statLabel}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.summary}>{summary}</Text>
      <AnimatedDemo variant={demoVariant} />
      <View style={styles.list}>
        {instructions.map((instruction, index) => (
          <View key={instruction} style={styles.listItem}>
            <Text style={styles.bullet}>{index + 1}.</Text>
            <Text style={styles.listText}>{instruction}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        <Pressable
          accessibilityLabel={`Toggle completion for ${title}`}
          style={[styles.primaryButton, completed && styles.primaryButtonDone]}
          onPress={onToggle}
        >
          <Text style={styles.primaryButtonText}>{completed ? '已完成 ✔' : '完成這個動作'}</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleVideo}>
          <Text style={styles.secondaryButtonText}>影片段落（{video.cueLabel}）</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
  },
  cardCompleted: {
    borderColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#cbd5f5',
    fontSize: 14,
    marginTop: 4,
  },
  tags: {
    alignItems: 'flex-end',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(248,250,252,0.15)',
  },
  tagText: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  tagSecondary: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(94,234,212,0.15)',
  },
  tagSecondaryText: {
    color: '#5eead4',
    fontSize: 12,
  },
  summary: {
    color: '#e2e8f0',
    marginTop: 12,
    lineHeight: 20,
  },
  list: {
    marginTop: 16,
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    color: '#94a3b8',
    fontWeight: '600',
  },
  listText: {
    color: '#cbd5f5',
    flex: 1,
    lineHeight: 20,
  },
  actions: {
    marginTop: 18,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2dd4bf',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonDone: {
    backgroundColor: '#22c55e',
  },
  primaryButtonText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  secondaryButton: {
    borderColor: 'rgba(248,250,252,0.4)',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#f8fafc',
    fontWeight: '600',
  },
});

export default ExerciseCard;
