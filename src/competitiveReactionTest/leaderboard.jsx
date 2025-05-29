import './styles.css'
import { motion, AnimatePresence } from "framer-motion";

function Leaderboard({ leaderboardData }) {
  const playerBestTimes = {};

  for (const entry of leaderboardData) {
    const name = Object.keys(entry)[0];
    const time = entry[name];

    if (!(name in playerBestTimes) || time < playerBestTimes[name]) {
      playerBestTimes[name] = time;
    }
  }

  const topTwo = Object.entries(playerBestTimes)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2);

  console.log(topTwo);

  leaderboardData.map((data, index) => {
    const playerName = Object.keys(data)[0];
    const reactionTime = data[playerName];
  });

  return (
  <div className="leaderboard">
    <h2>🏆 Leaderboard</h2>
    <div className="leaderboard-entries">
      <AnimatePresence>
        {topTwo.map(([name, time], index) => (
          <motion.div
            key={name}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="leaderboard-entry"
          >
            <span className="rank">#{index + 1}</span>
            <span className="name">{name}</span>
            <span className="time">{time} ms</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

}

export default Leaderboard;
