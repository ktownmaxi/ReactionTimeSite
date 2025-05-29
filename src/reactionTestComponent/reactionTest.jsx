import { useState, useEffect, useRef } from 'react';
import exportToExcel from '../helper/helpers';

function ReactionTest(props){
    let targetRuns = props.targetRuns;
    let playerNumber = props.playerNumber;

    const currentRunNumber = useRef(0);
    const reactionSpeedTracker = useRef([]);
    const reactionsCount = useRef(0);

    const [testActive, setTestActive] = useState(false);
    const [reactionTimePhase, setReactionTimePhase] = useState(0);
    const [instructionText, setInstructionText] = useState("ENTER drücken um den Test zu starten");

    useEffect(() => {
        if (testActive) {
            setReactionTimePhase(1);
            const randomDelay = Math.random() * 5 + 1; 
            setTimeout(initiateReactionTest, randomDelay * 1000);
        }
    }, [testActive])

    useEffect(() => {
        startTest();
    }, []);
    
    function startTest() {
        if (currentRunNumber.current > 0){
            setInstructionText(`Drücke Leertaste, wenn die Box grün wird`);
            setTestActive(true);

        } else {
            function handleKeystroke(event) { 
                if (event.key === 'Enter') {
                    setInstructionText(`Drücke Leertaste, wenn die Box grün wird`);
                    setTestActive(true);
                    document.removeEventListener('keydown', handleKeystroke);
                }
            }
            document.addEventListener('keydown', handleKeystroke);
        }
    }

    function initiateReactionTest() {
        const colorChangeTimestamp = Date.now()
        setReactionTimePhase(2);

        function handleKeystroke(event){
            if (playerNumber === 1){
                if (event.key === ' '){
                    const reactionTime = Date.now() - colorChangeTimestamp;
                    reactionSpeedTracker.current.push({player1: reactionTime});
                    setInstructionText(`Deine Reaktionszeit war ${reactionTime} ms. <br> Der Test wird in Kürze von selbst neu starten`);
                    setReactionTimePhase(0);
                    setTestActive(false);
                    currentRunNumber.current += 1;
                    if (currentRunNumber.current <= targetRuns - 1) {
                        setTimeout(startTest, 2000);
                    } else {
                        exportToExcel(reactionSpeedTracker.current);
                    }
                    document.removeEventListener('keydown', handleKeystroke);
                }
            }
            else if (playerNumber === 2){
                let reactionTime = 0;
                if (event.key === ' '){
                    reactionTime = Date.now() - colorChangeTimestamp;
                    reactionSpeedTracker.current.push({player1: reactionTime});
                    reactionsCount.current += 1;

                } if (event.key === 'q'){
                    reactionTime = Date.now() - colorChangeTimestamp;
                    reactionSpeedTracker.current.push({player2: reactionTime});
                    reactionsCount.current += 1;
                }
                if (reactionsCount.current >= 2){
                    setInstructionText(`Deine Reaktionszeit war ${reactionTime} ms. <br> Der Test wird in Kürze von selbst neu starten`);
                    setReactionTimePhase(0);
                    setTestActive(false);
                    currentRunNumber.current += 1;
                    if (currentRunNumber.current <= targetRuns - 1) {
                        setTimeout(startTest, 2000);
                    } else {
                        exportToExcel(reactionSpeedTracker.current);
                    }
                    reactionsCount.current = 0;
                    document.removeEventListener('keydown', handleKeystroke);
                }
            }   
        }

        document.addEventListener('keydown', handleKeystroke);
    }

    const baseColorBoxStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1000px',
        height: '400px',
        margin: '20px auto',
        borderRadius: '10px',
    }

    const instructionColorBoxStyle = {
        ...baseColorBoxStyle,
        backgroundColor: 'blue',
    }

    const activeColorBoxStyle = {
        ...baseColorBoxStyle,
        backgroundColor: 'green',
    }

    const inactiveColorBoxStyle = {
        ...baseColorBoxStyle,
        backgroundColor: 'red',
    }

    let colorBoxStyle;
    switch (reactionTimePhase) { 
        case 0:
            colorBoxStyle = instructionColorBoxStyle;
            break;
        case 1:
            colorBoxStyle = inactiveColorBoxStyle;
            break;
        case 2:
            colorBoxStyle = activeColorBoxStyle;
            break;
    }

    const instructionTextStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }

    return(
        <div className='reaction-test-container'>
            <div className='color-box' style={colorBoxStyle}>
                <p id='instructionText' style={instructionTextStyle} dangerouslySetInnerHTML={{ __html: instructionText }}/>
            </div>
        </div>
    );
}

export default ReactionTest;