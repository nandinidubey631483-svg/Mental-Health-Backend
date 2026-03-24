const moodScoreMap = {
  very_sad: 1,
  sad: 2,
  anxious: 2,
  stressed: 2,
  neutral: 3,
  calm: 4,
  happy: 4,
  excited: 5
};

const buildMoodAnalytics = (moods) => {
  if (!moods.length) {
    return {
      totalEntries: 0,
      averageMoodScore: 0,
      dominantMood: null,
      trends: []
    };
  }

  const totalScore = moods.reduce(
    (sum, item) => sum + (moodScoreMap[item.mood] || 0),
    0
  );

  const counts = moods.reduce((acc, item) => {
    acc[item.mood] = (acc[item.mood] || 0) + 1;
    return acc;
  }, {});

  const dominantMood =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const trends = moods.map((item) => ({
    date: item.date,
    mood: item.mood,
    score: moodScoreMap[item.mood] || 0
  }));

  return {
    totalEntries: moods.length,
    averageMoodScore: Number((totalScore / moods.length).toFixed(2)),
    dominantMood,
    trends
  };
};

module.exports = {
  moodScoreMap,
  buildMoodAnalytics
};
