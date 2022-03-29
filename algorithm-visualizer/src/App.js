
import './App.css';
import Home from './Components/Home';
import Caesar from './Components/Caesar';
import Blowfish from './Components/Blowfish';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AlgoNavBar from './Components/AlgoNavBar'
function App() {
  return (
    <><AlgoNavBar></AlgoNavBar><Router>
      <div className="App" >
        <Routes>
          <Route path='/caesar' element={<Caesar />} />
          <Route path='/blowfish' element={<Blowfish />} />
          <Route path='/' element={<Home />} />
        </Routes>

      </div>
    </Router></>
  );
}

export default App;
