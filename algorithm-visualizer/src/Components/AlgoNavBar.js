import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.css';
import './AlgoNavBar.css'
import Caesar from './Caesar';
import Blowfish from './Blowfish';
import Home from './Home';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom'
const AlgoNavBar = () => {
  return (
    <Navbar expand="lg" className={'main_bar'}>
      <Container>
        {/* <Router> */}
          <Navbar.Brand href="#home">Algorithm Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/caesar">Caesar Cipher</Nav.Link>
              <Nav.Link href="/des">DES</Nav.Link>
              <Nav.Link href="/blowfish">Blowfish</Nav.Link>
              <Nav.Link href="/ecb">Block ECB</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
          </Nav>
          </Navbar.Collapse>
          {/* <Routes>
          <Route path='/caesar' component={Caesar} />
          <Route path='/blowfish' component={Blowfish} />
          <Route path='/' component={Home} />
          </Routes>
          </Router> */}
      </Container>
    </Navbar>
  );
};
export default AlgoNavBar;