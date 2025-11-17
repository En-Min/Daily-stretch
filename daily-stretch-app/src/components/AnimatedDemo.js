import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const useLoopingAnimation = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);

  return progress;
};

const AnimatedDemo = ({ variant }) => {
  const progress = useLoopingAnimation();

  const renderers = {
    lunge: () => <LungeDemo progress={progress} />,
    kneesToChest: () => <KneesToChestDemo progress={progress} />,
    posteriorTilt: () => <PosteriorTiltDemo progress={progress} />,
    deadBug: () => <DeadBugDemo progress={progress} />,
    bridge: () => <BridgeDemo progress={progress} />,
  };

  const DemoComponent = renderers[variant];

  return (
    <View style={styles.container}>
      {DemoComponent ? DemoComponent() : <FallbackDemo />}
      <View style={styles.floorLine} />
    </View>
  );
};

const LungeDemo = ({ progress }) => {
  const torsoShift = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });
  const backLegShift = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });
  const frontKneeAngle = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['-25deg', '-5deg'],
  });

  return (
    <View style={styles.stage}>
      <Animated.View style={[styles.torso, { transform: [{ translateY: torsoShift }] }]} />
      <Animated.View style={[styles.backLeg, { transform: [{ translateX: backLegShift }] }]} />
      <Animated.View style={[styles.frontThigh, { transform: [{ rotate: '-65deg' }] }]} />
      <Animated.View style={[styles.frontShin, { transform: [{ rotate: frontKneeAngle }] }]} />
    </View>
  );
};

const KneesToChestDemo = ({ progress }) => {
  const kneeTravel = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -10],
  });
  return (
    <View style={styles.stage}>
      <View style={styles.supineTorso} />
      <Animated.View
        style={[
          styles.kneeBlock,
          {
            transform: [
              { translateY: kneeTravel },
              { translateX: -5 },
            ],
          },
        ]}
      />
    </View>
  );
};

const PosteriorTiltDemo = ({ progress }) => {
  const tilt = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['3deg', '-6deg'],
  });
  const abGlow = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(56,189,248,0.2)', 'rgba(56,189,248,0.5)'],
  });
  return (
    <View style={styles.stage}>
      <Animated.View
        style={[
          styles.pelvis,
          {
            transform: [{ rotate: tilt }],
            shadowColor: '#38bdf8',
          },
        ]}
      />
      <Animated.View style={[styles.coreGlow, { backgroundColor: abGlow }]} />
    </View>
  );
};

const DeadBugDemo = ({ progress }) => {
  const armRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '25deg'],
  });
  const legExtend = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['10deg', '-20deg'],
  });

  return (
    <View style={styles.stage}>
      <View style={styles.supineTorso} />
      <Animated.View
        style={[
          styles.arm,
          { transform: [{ rotate: armRotate }, { translateX: -8 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.leg,
          { transform: [{ rotate: legExtend }, { translateX: 8 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.arm,
          { transform: [{ rotate: '-15deg' }, { translateX: 18 }] },
          styles.mutedLimb,
        ]}
      />
      <Animated.View
        style={[
          styles.leg,
          { transform: [{ rotate: '15deg' }, { translateX: -18 }] },
          styles.mutedLimb,
        ]}
      />
    </View>
  );
};

const BridgeDemo = ({ progress }) => {
  const lift = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });
  return (
    <View style={styles.stage}>
      <View style={styles.foot} />
      <View style={[styles.foot, { left: undefined, right: 12 }]} />
      <Animated.View
        style={[
          styles.bridgeTorso,
          {
            transform: [
              { translateY: lift },
              { rotate: '-2deg' },
            ],
          },
        ]}
      />
    </View>
  );
};

const FallbackDemo = () => <View style={styles.stage} />;

const styles = StyleSheet.create({
  container: {
    height: 110,
    borderRadius: 16,
    backgroundColor: 'rgba(15,23,42,0.65)',
    overflow: 'hidden',
    marginTop: 12,
  },
  stage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floorLine: {
    height: 2,
    backgroundColor: 'rgba(248,250,252,0.15)',
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 999,
  },
  torso: {
    height: 50,
    width: 14,
    borderRadius: 999,
    backgroundColor: '#38bdf8',
  },
  backLeg: {
    position: 'absolute',
    bottom: 18,
    width: 10,
    height: 48,
    borderRadius: 999,
    backgroundColor: '#22d3ee',
    transform: [{ rotate: '-20deg' }],
  },
  frontThigh: {
    position: 'absolute',
    bottom: 15,
    width: 10,
    height: 44,
    borderRadius: 999,
    backgroundColor: '#f97316',
  },
  frontShin: {
    position: 'absolute',
    bottom: -6,
    width: 10,
    height: 46,
    borderRadius: 999,
    backgroundColor: '#fb923c',
  },
  supineTorso: {
    width: 70,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#38bdf8',
  },
  kneeBlock: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#fb7185',
  },
  pelvis: {
    width: 70,
    height: 26,
    borderRadius: 12,
    backgroundColor: '#38bdf8',
  },
  coreGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(56,189,248,0.3)',
  },
  arm: {
    position: 'absolute',
    top: 10,
    width: 10,
    height: 50,
    borderRadius: 999,
    backgroundColor: '#facc15',
  },
  leg: {
    position: 'absolute',
    bottom: 0,
    width: 10,
    height: 52,
    borderRadius: 999,
    backgroundColor: '#a3e635',
  },
  mutedLimb: {
    opacity: 0.4,
  },
  foot: {
    position: 'absolute',
    bottom: 4,
    left: 12,
    width: 30,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#a3e635',
  },
  bridgeTorso: {
    width: 100,
    height: 24,
    borderRadius: 14,
    backgroundColor: '#f97316',
  },
});

export default AnimatedDemo;
