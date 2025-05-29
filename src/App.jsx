import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import StartPage from './startPage/startPage';
import SoloReactionTest from './soloReactionTest/soloReactionTest';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/soloReactionTest/:numberOfRuns" element={<SoloReactionTest/>}/>
        </Routes>
      </div>

  )
}

export default App
