import { useEffect, useState} from "react";
import axios from "axios";
import { exportToExcelMultiplayer, exportToExcelSingleplayer } from "../helper/helpers";
import { useUuid } from '../helper/uuidContext';
import StartScreen from "./automaticTestStart";
import ReactionTest from "../reactionTestComponent/reactionTest";
import FinishScreen from "./finishScreen";


function AutomaticReactionTest() {

    const targetRuns = 2;
    const uuid = useUuid();

    const [screen, setScreen] = useState("start");
    const [group, setGroup] = useState("A");
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

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
            console.log("Datei erfolgreich hochgeladen");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }


    useEffect(() => {
        uploadFile();
    }, [file]);

    const addData = (playerName, reactionTime) => {
      setData(prev => [...prev, { [playerName]: reactionTime }]);
    };

    function startSecondTest() {
        setData([]);
        if (group === "A") {
            setScreen("competitive");
        } else if (group === "B") {
            setScreen("solo2")
        }
    }

    const soloTestCallback = () => {
        setData(prevData => {
            setFile(exportToExcelSingleplayer(prevData, uuid + "Gruppe" + group + "Singleplayer1" + ".xlsx"));
            return prevData;
        });
        startSecondTest();
    }

    const secondTestCallback = () => {
        setData(prevData => {
        console.log("Data for export:", prevData);
        if (group === "A") {
            setFile(exportToExcelMultiplayer(prevData, uuid + "Gruppe" + group + "Multiplayer1" + ".xlsx"));
        } else if (group === "B") {
            setFile(exportToExcelSingleplayer(prevData, uuid + "Gruppe" + group + "Singleplayer2" + ".xlsx"));
        }
        return prevData;
        });
        setScreen("finish");
    }

    const screens = {
        start: <StartScreen setScreen={setScreen} setGroup={setGroup} onNext={setScreen} />,
        solo : <ReactionTest key="solo" targetRuns={targetRuns} playerNumber={1} addData={addData} callback={soloTestCallback}/>,
        solo2 : <ReactionTest key="solo2" targetRuns={targetRuns} playerNumber={1} addData={addData} callback={secondTestCallback}/>,
        competitive : <ReactionTest key="competitive" targetRuns={targetRuns} playerNumber={2} addData={addData} qPlayerName={"Spieler Q"} üPlayerName={"Spieler Ü"} callback={secondTestCallback}/>,
        finish : <FinishScreen/>
    };

    return (
        <div className="main">
            {screens[screen]}
        </div>
    );

}

export default AutomaticReactionTest;