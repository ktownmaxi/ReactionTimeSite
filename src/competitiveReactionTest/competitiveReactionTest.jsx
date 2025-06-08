import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactionTest from '../reactionTestComponent/reactionTest';
import Leaderboard from './leaderboard';
import { exportToExcelMultiplayer } from '../helper/helpers';
import { useState } from 'react';
import { useUuid } from '../helper/uuidContext';

function CompetitiveReactionTest() {
    const navigate = useNavigate();
    const uuid = useUuid();

    let targetRuns = useParams().numberOfRuns;
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const qPlayerName = queryParams.get('qPlayerName');
    const üPlayerName = queryParams.get('üPlayerName');

    const buttonStyle = {
        width: '200px',
        height: '50px',
        fontSize: '16px',
        margin: '10px',
        cursor: 'pointer',
        userSelect: 'none',
    }

    const [data, setData] = useState([]);

    const addData = (playerName, reactionTime) => {
      setData(prev => [...prev, { [playerName]: reactionTime }]);
    };

  return (
    <div>
        <h1>1 vs. 1 - Reaktionstest</h1>

        <Leaderboard leaderboardData={data} />
        <ReactionTest targetRuns={targetRuns} playerNumber={2} addData={addData} qPlayerName={qPlayerName} üPlayerName={üPlayerName}/>

        <div className='reaction-test-buttons'>
            <button style={buttonStyle} onClick={() => navigate('/')}>Zurück zur Startseite</button>
            <button style={buttonStyle} onClick={() => {console.log(data) 
              exportToExcelMultiplayer(data,  uuid + ".xlsx")}}>Daten herunterladen</button>
        </div>
    </div>
  );
}

export default CompetitiveReactionTest;