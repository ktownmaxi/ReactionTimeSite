import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function StartPage() {
  const navigate = useNavigate();

  const [selectedMode, setSelectedMode] = useState(null);
  const [numberOfRuns, setNumberOfRuns] = useState(3);

  const options = ["Solo Reaktionstest", "1v1 Reaktionstest"];

  const startReactionTest = () => {
    if (selectedMode === null) {
      alert("Bitte wähle einen Modus aus.");
      return;
    } else if (selectedMode === 0) {
      navigate(`/soloReactionTest/${numberOfRuns}`)
    } else if (selectedMode === 1) {
      navigate(`/competitiveReactionTest/${numberOfRuns}`)
    }
  }

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
    width: '200px',
    height: '15px',
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
      <h1>Reaktionstests</h1>

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