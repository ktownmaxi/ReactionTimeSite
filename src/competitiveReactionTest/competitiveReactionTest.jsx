import { useParams, useNavigate } from 'react-router-dom';
import ReactionTest from '../reactionTestComponent/reactionTest';
import exportToExcel from '../helper/helpers';
import { useEffect, useState } from 'react';

function CompetitiveReactionTest() {
    const navigate = useNavigate();

    let targetRuns = useParams().numberOfRuns;

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

    useEffect(() => {
      console.log(data)
    }, [data]);

  return (
    <div>
        <h1>1vs1 Reaktionstest</h1>

        <ReactionTest targetRuns={targetRuns} playerNumber={2} addData={addData} />

        <div className='reaction-test-buttons'>
            <button style={buttonStyle} onClick={() => navigate('/')}>Zurück zur Startseite</button>
            <button style={buttonStyle} onClick={() => exportToExcel(data)}>Daten herunterladen</button>
        </div>
    </div>
  );
}

export default CompetitiveReactionTest;