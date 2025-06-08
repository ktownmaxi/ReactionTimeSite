import { useState } from "react";

function StartScreen({ setScreen, setGroup }) {

    const [selectedGroup, setSelectedGroup] = useState(null);

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

  const startReactionTest = () => {
    if (selectedGroup === null) {
      alert("Bitte wähle die richtige Gruppe aus.");
      return;
    }
    if (selectedGroup === 0) {
      setGroup("A");
    } else if (selectedGroup === 1) {
      setGroup("B"); 
    }
    setScreen("solo");
  };


  return (
    <div>
      <h1>Reaktionstest</h1>
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

        <button style={inactiveButtonStyle} onClick={() => startReactionTest()}>Reaktionstest starten</button>
    </div>
  );
}

export default StartScreen;