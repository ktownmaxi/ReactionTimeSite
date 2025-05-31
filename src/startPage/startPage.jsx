import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function StartPage() {
  const navigate = useNavigate();

  const [selectedMode, setSelectedMode] = useState(null);
  const [numberOfRuns, setNumberOfRuns] = useState(3);

  const [qPlayerName, setPlayerName1] = useState('');
  const [üPlayerName, setPlayerName2] = useState('');

  const options = ["Solo Reaktionstest", "1v1 Reaktionstest"];

  const startReactionTest = () => {
    if (selectedMode === null) {
      alert("Bitte wähle einen Modus aus.");
      return;
    }

    if (selectedMode === 0) {
      navigate(`/soloReactionTest/${numberOfRuns}`);
    } else if (selectedMode === 1) {
      if (!qPlayerName.trim() || !üPlayerName.trim()) {
        alert("Bitte gib die Namen beider Spieler ein.");
        return;
      }
      navigate(
        `/competitiveReactionTest/${numberOfRuns}?qPlayerName=${encodeURIComponent(qPlayerName)}&üPlayerName=${encodeURIComponent(üPlayerName)}`
      );
    }
  };
  const baseButtonStyle = {
    width: '200px',
    height: '50px',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  };

  const inactiveButtonStyle = {
    ...baseButtonStyle,
  };

  const activeButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#28A745',
    border: '2px solid rgb(255, 255, 255)',
    color: 'white',
  };

  const inputFieldStyle = {
    color: 'white',
    textAlign: 'center',
    width: '200px',
    height: '18px',
    fontSize: '16px',
    margin: '10px',
    text: 'center',
    padding: '5px',
    borderRadius: '5px',
    border: '2px solid #ccc',
    userSelect: 'none',
  };

  return (
    <div>
      <h1>Reaktionstests - Start Menü</h1>

      <div className="mode-selection">
        <h2>Wähle einen Modus:</h2>
        <div className="mode-selection-buttons">
          {options.map((option, index) => (
            <button
              key={index}
              style = {selectedMode === index ? activeButtonStyle : inactiveButtonStyle}
              onClick={() => setSelectedMode(index)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="name-creator" style={{ display: selectedMode!==1 ? 'none' : 'block' }} >
          <input type="text" style={inputFieldStyle} value={qPlayerName}  onChange={(e) => setPlayerName1(e.target.value)} placeholder="Name des Q-Spielers"/>
          <input type="text" style={inputFieldStyle} value={üPlayerName} onChange={(e) => setPlayerName2(e.target.value)} placeholder="Name des Ü-Spielers"/>
        </div>
      </div>

      <div className="numberOfRunsSelection">
        <h2>Wähle die Anzahl an Testdurchläufen:</h2>
        <input type="number" style={inputFieldStyle} value={numberOfRuns} min="1" onChange={(e) => setNumberOfRuns(Number(e.target.value))}/>
      </div>

      <button style={inactiveButtonStyle} onClick={() => startReactionTest()}>Reaktionstest starten</button>
    </div>
  );
}

export default StartPage;