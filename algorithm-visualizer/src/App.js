
import './App.css';
import Home from './Components/Home';
import Caesar from './Components/Caesar';
import Blowfish from './Components/Blowfish';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <><Router>
      <div className="App">
        <Routes>
          <Route path='/caesar' component={Caesar} />
          <Route path='/blowfish' component={Blowfish} />
          <Route path='/' component={Home} />
        </Routes>
      </div>
    </Router><Home></Home></>
  );
}

export default App;
