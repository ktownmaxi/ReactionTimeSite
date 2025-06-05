import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactionTest from '../reactionTestComponent/reactionTest';
import { exportToExcelSingleplayer } from '../helper/helpers';
import { useUuid } from '../helper/uuidContext';

function SoloReactionTest(){
    const navigate = useNavigate();
    const uuid = useUuid()

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
        setData(prev => [...prev, { name: playerName, reactionTime }]);
    };
    
    return (
        <div>
            <h1>Simpler Reaktionstest</h1>

            <ReactionTest targetRuns={targetRuns} playerNumber={1} addData={addData}/>

            <div className='reaction-test-buttons'>
                <button style={buttonStyle} onClick={() => navigate('/')}>Zurück zur Startseite</button>
            <button style={buttonStyle} onClick={() => exportToExcelSingleplayer(data, uuid + ".xlsx")}>Daten herunterladen</button>
            </div>

        </div>
    );

}

export default SoloReactionTest;