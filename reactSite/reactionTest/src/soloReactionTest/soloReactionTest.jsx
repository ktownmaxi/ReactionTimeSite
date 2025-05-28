import { useParams } from 'react-router-dom';
import ReactionTest from '../reactionTestComponent/reactionTest';

function SoloReactionTest(){
    let targetRuns = useParams().numberOfRuns;
    
    return (
        <div>
            <h1>Simpler Reaktionstest</h1>

            <ReactionTest targetRuns={targetRuns}/>

        </div>
    );

}

export default SoloReactionTest;