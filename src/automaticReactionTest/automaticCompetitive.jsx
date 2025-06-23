import Leaderboard from "../competitiveReactionTest/leaderboard";
import ReactionTest from "../reactionTestComponent/reactionTest";

function CompetitiveScreen({targetRuns, playerNumber, addData, qPlayerName, üPlayerName, callback, data}) {

    return (
        <div>
            <h1>{qPlayerName} (Q) vs. {üPlayerName} (Ü)</h1>
            <Leaderboard leaderboardData={data} />
            <ReactionTest key="competitive" targetRuns={targetRuns} playerNumber={playerNumber} addData={addData} qPlayerName={qPlayerName} üPlayerName={üPlayerName} callback={callback}/>
        </div>

    );
}

export default CompetitiveScreen;
