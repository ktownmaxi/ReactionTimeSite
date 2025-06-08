import { useState} from "react";
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
    const [data, setData] = useState([]);

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
            exportToExcelSingleplayer(prevData, uuid + "Gruppe" + group + ".xlsx");
            return prevData;
        });
        startSecondTest();
    }

    const secondTestCallback = () => {
        setData(prevData => {
        console.log("Data for export:", prevData);
        if (group === "A") {
            exportToExcelMultiplayer(prevData, uuid + "Gruppe" + group + ".xlsx");
        } else if (group === "B") {
            exportToExcelSingleplayer(prevData, uuid + "Gruppe" + group + ".xlsx");
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