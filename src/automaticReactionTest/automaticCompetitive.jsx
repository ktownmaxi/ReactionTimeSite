import Leaderboard from "../competitiveReactionTest/leaderboard";
import ReactionTest from "../reactionTestComponent/reactionTest";

function CompetitiveScreen({targetRuns, playerNumber, addData, qPlayerName, üPlayerName, callback, data}) {

    return (
        <div>
            <Leaderboard leaderboardData={data} />
            <ReactionTest key="competitive" targetRuns={targetRuns} playerNumber={playerNumber} addData={addData} qPlayerName={qPlayerName} üPlayerName={üPlayerName} callback={callback}/>
        </div>

    );
}

export default CompetitiveScreen;
