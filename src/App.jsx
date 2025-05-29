import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import StartPage from './startPage/startPage';
import SoloReactionTest from './soloReactionTest/soloReactionTest';
import CompetitiveReactionTest from './competitiveReactionTest/competitiveReactionTest';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/soloReactionTest/:numberOfRuns" element={<SoloReactionTest/>}/>
          <Route path="/competitiveReactionTest/:numberOfRuns" element={<CompetitiveReactionTest/>}/>
        </Routes>
      </div>

  )
}

export default App
