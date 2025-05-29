import { useParams, useNavigate } from 'react-router-dom';
import ReactionTest from '../reactionTestComponent/reactionTest';

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

  return (
    <div>
        <h1>1vs1 Reaktionstest</h1>

        <ReactionTest targetRuns={targetRuns} playerNumber={2} />

        <div className='reaction-test-buttons'>
            <button style={buttonStyle} onClick={() => navigate('/')}>Zurück zur Startseite</button>
        </div>
    </div>
  );
}

export default CompetitiveReactionTest;