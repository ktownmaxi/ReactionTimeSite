import { useEffect, useState} from "react";
import axios from "axios";
import { exportToExcelMultiplayer, exportToExcelSingleplayer } from "../helper/helpers";
import StartScreen from "./automaticTestStart";
import ReactionTest from "../reactionTestComponent/reactionTest";
import FinishScreen from "./finishScreen";
import CompetitiveScreen from "./automaticCompetitive";


function AutomaticReactionTest() {

    const targetRuns = 15;

    const [screen, setScreen] = useState("start");
    const [group, setGroup] = useState("A");
    const [file, setFile] = useState(null);
    const [dataSingleplayer, setDataSingleplayer] = useState([]);
    const [dataCompetitive, setDataCompetitive] = useState([]);

    const [qPlayerName, setPlayerNameQ] = useState('');
    const [üPlayerName, setPlayerNameÜ] = useState('');

    async function uploadFile() {
        if (!file) return;
        try {
            await axios.post(
            'https://dev.adc-mbdevelopment.me/upload',
            file,
            {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
            );
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }


    useEffect(() => {
        uploadFile();
    }, [file]);

    const addDataCompetitive = (playerName, reactionTime) => {
      setDataCompetitive(prev => [...prev, { [playerName]: reactionTime }]);
    };

    const addDataSingleplayer = (playerName, reactionTime) => {
        setDataSingleplayer(prev => [...prev, { name: playerName, reactionTime }]);
    };

    function startSecondTest() {
        setDataSingleplayer([]);
        setDataCompetitive([]);
        setScreen("solo2");
    }

    const soloTestCallback = () => {
        setDataSingleplayer(prevData => {
            setFile(exportToExcelSingleplayer(prevData, "Gruppe" + group + "Solo" + qPlayerName + ".xlsx"));
            return prevData;
        });
        startSecondTest();
    }

    const secondTestCallback = () => {
        setDataSingleplayer(prevData => {
            if (group === "A") {
                setFile(exportToExcelSingleplayer(prevData, "Gruppe" + group + "Solo" + üPlayerName + ".xlsx"));
                setScreen("competitive");
            } else if (group === "B") {
                setFile(exportToExcelSingleplayer(prevData, "Gruppe" + group + "Solo2" + qPlayerName + ".xlsx"));
                setScreen("finish");
            }
            return prevData;
        });
    }

    const competitiveTestCallback = () => {
        setDataCompetitive(prevData => {
            setFile(exportToExcelMultiplayer(prevData,  "Gruppe" + group + "Multiplayer" + qPlayerName + üPlayerName + ".xlsx"));
            setScreen("finish");
            return prevData;
        });
    }

    const screens = {
        start: <StartScreen setScreen={setScreen} setGroup={setGroup} setPlayerQ={setPlayerNameQ} setPlayerÜ={setPlayerNameÜ} onNext={setScreen} />,
        solo : <div>
                    <h1>Solo Test von {qPlayerName}</h1>    
                    <ReactionTest key="solo" targetRuns={targetRuns} playerNumber={1} addData={addDataSingleplayer} callback={soloTestCallback}/>
        </div>,
        solo2: <div>
                    <h1>Solo Test von {üPlayerName}</h1>    
                    <ReactionTest key="solo2" targetRuns={targetRuns} playerNumber={1} addData={addDataSingleplayer} callback={secondTestCallback}/>
        </div>,
        competitive : <CompetitiveScreen key="competitive" targetRuns={targetRuns} playerNumber={2} addData={addDataCompetitive} qPlayerName={qPlayerName} üPlayerName={üPlayerName} callback={competitiveTestCallback} data={dataCompetitive}/>,
        finish : <FinishScreen/>
    };

    return (
        <div className="main">
            {screens[screen]}
        </div>
    );

}

export default AutomaticReactionTest;