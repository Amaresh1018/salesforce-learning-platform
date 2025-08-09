const dummyLeaderboard = [
  { username: 'trailblazer', points: 1300 },
  { username: 'apexpro', points: 1180 },
  { username: 'crmguru', points: 990 },
];

export default function LeaderboardPanel() {
  return (
    <section className="bg-white/25 p-4 rounded-xl shadow-inner backdrop-blur">
      <h3 className="text-lg font-bold mb-2 text-indigo-800 dark:text-indigo-200">Leaderboard</h3>
      <ul className="divide-y divide-white/30">
        {dummyLeaderboard.map((entry, i) => (
          <li key={i} className="flex justify-between py-1">
            <span className="font-semibold">{i + 1}. {entry.username}</span>
            <span className="font-bold text-indigo-600">{entry.points} pts</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
