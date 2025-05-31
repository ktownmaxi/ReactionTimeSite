import { useState, useEffect, useRef } from 'react';

function ReactionTest({ targetRuns, playerNumber, addData, playerName1, playerName2 }) {
    const currentRunNumber = useRef(0);
    const reactionSpeedTracker = useRef([]);
    const reactionsCount = useRef(0);

    const [testActive, setTestActive] = useState(false);
    const [reactionTimePhase, setReactionTimePhase] = useState(0);
    const [instructionText, setInstructionText] = useState("ENTER drücken um den Test zu starten");

    const addReactionTime = (playerName, reactionTime) => {
        reactionSpeedTracker.current.push({[playerName]: reactionTime});
        addData(playerName, reactionTime);
    }

    useEffect(() => {
        if (testActive) {
            setReactionTimePhase(1);
            const randomDelay = Math.random() * 6 + 2; // Random delay between 2 and 8 seconds
            setTimeout(initiateReactionTest, randomDelay * 1000);
        }
    }, [testActive])

    useEffect(() => {
        startTest();
    }, []);
    
    function startTest() {
        if (currentRunNumber.current > 0){
            playerNumber === 1 ? setInstructionText(`Drücke Q , wenn die Box grün wird`) : setInstructionText(`Drücke Ü oder Q , wenn die Box grün wird`) ;
            setTestActive(true);

        } else {
            function handleKeystroke(event) { 
                if (event.key === 'Enter') {
                    playerNumber === 1 ? setInstructionText(`Drücke Q , wenn die Box grün wird`) : setInstructionText(`Drücke Ü oder Q , wenn die Box grün wird`) ;
                    setTestActive(true);
                    document.removeEventListener('keydown', handleKeystroke);
                }
            }
            document.addEventListener('keydown', handleKeystroke);
        }
    }

    function initiateReactionTest() {
        const colorChangeTimestamp = Date.now()
        let reactionTimePlayerQ = 0;
        let reactionTimePlayerÜ = 0;
        setReactionTimePhase(2);

        function handleKeystroke(event){
            if (playerNumber === 1){
                if (event.key === 'q'){
                    const reactionTime = Date.now() - colorChangeTimestamp;
                    addReactionTime('Player1', reactionTime);
                    setInstructionText(`Deine Reaktionszeit war ${reactionTime} ms. <br> Der Test wird in Kürze von selbst neu starten`);
                    setReactionTimePhase(0);
                    setTestActive(false);
                    currentRunNumber.current += 1;
                    if (currentRunNumber.current <= targetRuns - 1) {
                        setTimeout(startTest, 2000);
                    } else {
                        setInstructionText(`Der Test ist abgeschlossen`);
                    }
                    document.removeEventListener('keydown', handleKeystroke);
                }
            }
            else if (playerNumber === 2){
                if (event.key === 'ü'){
                    reactionTimePlayerÜ = Date.now() - colorChangeTimestamp;
                    addReactionTime(playerName1, reactionTimePlayerÜ);
                    reactionsCount.current += 1;

                } if (event.key === 'q'){
                    reactionTimePlayerQ = Date.now() - colorChangeTimestamp;
                    addReactionTime(playerName2, reactionTimePlayerQ);
                    reactionsCount.current += 1;
                }
                if (reactionsCount.current >= 2){
                    setInstructionText(`Die Reaktionzeit des Q-Spielers war ${reactionTimePlayerQ} ms.
                        <br> Die Reaktionszeit des Ü-Spielers war ${reactionTimePlayerÜ} ms.
                        <br> Der Test wird in Kürze von selbst neu starten`);
                    setReactionTimePhase(0);
                    setTestActive(false);
                    currentRunNumber.current += 1;
                    if (currentRunNumber.current <= targetRuns - 1) {
                        setTimeout(startTest, 2000);
                    } else {
                        setInstructionText(`Der Test ist abgeschlossen`);
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