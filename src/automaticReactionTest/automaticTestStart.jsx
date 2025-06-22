import { useState } from "react";

function StartScreen({ setScreen, setGroup, setPlayerQ, setPlayerÜ }) {

    const [selectedGroup, setSelectedGroup] = useState(0);

    const [qPlayerName, setPlayerName1] = useState('');
    const [üPlayerName, setPlayerName2] = useState('');

    const options = ["Gruppe A", "Gruppe B"];

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
  
  const startReactionTest = () => {
    if (selectedGroup === null) {
      alert("Bitte wähle die richtige Gruppe aus.");
      return;
    }
    if (selectedGroup === 0) {
      setGroup("A");
      setPlayerQ(qPlayerName);
      setPlayerÜ(üPlayerName);
    } else if (selectedGroup === 1) {
      setGroup("B"); 
      setPlayerQ(qPlayerName);
    }
    setScreen("solo");
  };


  return (
    <div>
      <h1>Reaktionstest Klasse 5</h1>
      <p>In welcher Gruppe bist du?</p>
       <div className="mode-selection-buttons">
          {options.map((option, index) => (
            <button
              key={index}
              style = {selectedGroup === index ? activeButtonStyle : inactiveButtonStyle}
              onClick={() => setSelectedGroup(index)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="name-creator" style={{display: 'block'}} >
          <input type="text" style={inputFieldStyle} value={qPlayerName}  onChange={(e) => setPlayerName1(e.target.value)} placeholder="Name des Q-Spielers"/>
          {selectedGroup === 0 && (
            <input
              type="text"
              style={inputFieldStyle}
              value={üPlayerName}
              onChange={(e) => setPlayerName2(e.target.value)}
              placeholder="Name des Ü-Spielers"
            />
          )}
        </div>

        <button style={inactiveButtonStyle} onClick={() => startReactionTest()}>Reaktionstest starten</button>
    </div>
  );
}

export default StartScreen;