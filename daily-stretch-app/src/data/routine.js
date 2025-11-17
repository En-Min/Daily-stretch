const YOUTUBE_BASE = 'https://youtu.be/mkbNJKiWNlI';

export const exercises = [
  {
    id: 'hip-flexor-stretch',
    title: 'Hip Flexor Stretch',
    category: 'lengthen',
    holdSeconds: 20,
    sets: 3,
    demoVariant: 'lunge',
    summary: 'Half-kneeling stretch to release tight hip flexors pulling the pelvis into anterior tilt.',
    focus: 'Lengthen the rectus femoris and psoas so your pelvis can stack back over your ribs.',
    video: {
      url: `${YOUTUBE_BASE}?t=141`,
      cueLabel: '2:21 mark',
    },
    instructions: [
      'Drop into a half-kneeling position with the back knee cushioned and toes untucked.',
      'Posteriorly tilt your pelvis (tailbone gently forward) before shifting hips ahead.',
      'Squeeze the back-side glute to keep the stretch in the front of the hip.',
      'Float the same-side arm overhead and breathe for 20 seconds per side.',
    ],
  },
  {
    id: 'lower-back-stretch',
    title: 'Lower Back Decompression',
    category: 'mobility',
    holdSeconds: 20,
    sets: 3,
    demoVariant: 'kneesToChest',
    summary: 'Supine lower-back stretch (knees-to-chest) to unwind lumbar tension from sway-back posture.',
    focus: 'Gently flex the lumbar spine that stays locked in extension with pelvic tilt.',
    video: {
      url: `${YOUTUBE_BASE}?t=214`,
      cueLabel: '3:34 mark',
    },
    instructions: [
      'Lie on your back, bring both knees toward the chest, and clasp your shins.',
      'Exhale as you imprint the low back into the floor, feeling the sacrum slide.',
      'Rock side to side for gentle traction, then hold centrally for the remainder.',
      'Keep shoulders relaxed while breathing deep into the back body.',
    ],
  },
  {
    id: 'lower-abs-1',
    title: 'Posterior Pelvic Tilt March',
    category: 'core',
    reps: 10,
    sets: 3,
    demoVariant: 'posteriorTilt',
    summary: 'Lower-ab activation drill shown in the video to train the abs to hold neutral pelvis.',
    focus: 'Teach the transverse abdominis to “zip up” before the legs move.',
    video: {
      url: `${YOUTUBE_BASE}?t=265`,
      cueLabel: '4:25 mark',
    },
    instructions: [
      'Lie supine with knees bent, feet flat, tailbone heavy.',
      'Exhale to flatten the low back (posterior tilt) without squeezing the glutes.',
      'Keeping the tilt, float one foot a few inches up, then switch like a slow march.',
      'Count a rep every time both legs have lifted once, maintaining control.',
    ],
  },
  {
    id: 'lower-abs-2',
    title: 'Dead Bug Reach',
    category: 'core',
    reps: 10,
    sets: 3,
    demoVariant: 'deadBug',
    summary: 'Progression from the video pairing opposite arm and leg to reinforce rib-to-hip control.',
    focus: 'Challenge anti-extension strength while keeping ribs stacked over pelvis.',
    video: {
      url: `${YOUTUBE_BASE}?t=346`,
      cueLabel: '5:46 mark',
    },
    instructions: [
      'Hold the posterior pelvic tilt and tabletop legs from the prior drill.',
      'Reach arms toward the ceiling, palms facing in.',
      'Extend the right leg and left arm slowly until they hover above the floor.',
      'Exhale to return to center without arching, then alternate sides.',
    ],
  },
  {
    id: 'glute-strength-1',
    title: 'Glute Bridge Pulses',
    category: 'strength',
    reps: 20,
    sets: 3,
    demoVariant: 'bridge',
    summary: 'Finish with the glute bridge from the video to reinforce posterior chain support.',
    focus: 'Strengthen glutes to keep the pelvis from dumping forward during daily life.',
    video: {
      url: `${YOUTUBE_BASE}?t=404`,
      cueLabel: '6:44 mark',
    },
    instructions: [
      'Feet hip-width, knees bent, heels close enough that you can graze them.',
      'Exhale, drive through the heels, and peel the spine up one vertebra at a time.',
      'Pause at the top with ribs knitted down and glutes squeezed, not the low back.',
      'Lower halfway, pulse back up for the prescribed reps without losing alignment.',
    ],
  },
];

export const routineMetadata = {
  title: 'Daily Pelvic Tilt Reset',
  subtitle: 'Guided flow inspired by Tone and Tighten’s anterior pelvic tilt routine',
  videoUrl: YOUTUBE_BASE,
};

export default exercises;
