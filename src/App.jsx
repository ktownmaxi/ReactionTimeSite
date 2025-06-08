import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import StartPage from './startPage/startPage';
import SoloReactionTest from './soloReactionTest/soloReactionTest';
import CompetitiveReactionTest from './competitiveReactionTest/competitiveReactionTest';
import AutomaticReactionTest from './automaticReactionTest/automaticReactionTest';
import DataManager from './dataManager/dataManager';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/soloReactionTest/:numberOfRuns" element={<SoloReactionTest/>}/>
          <Route path="/competitiveReactionTest/:numberOfRuns" element={<CompetitiveReactionTest/>}/>
          <Route path="/automaticReactionTest/" element={<AutomaticReactionTest/>}/>
          <Route path="/dataManager" element={<DataManager/>}/>
        </Routes>

        <footer id="footer">
          <a href="https://github.com/ktownmaxi/ReactionTimeSite" target="_blank" rel="noopener noreferrer">
            Quellcode auf GitHub ansehen
          </a>
        </footer>
      </div>

  )
}

export default App
