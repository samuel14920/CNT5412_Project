import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.css';
import './AlgoNavBar.css'
const AlgoNavBar = () => {
  return (
    <Navbar expand="lg" className={'main_bar'}>
      <Container>
          <Navbar.Brand href="#home">Algorithm Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Caesar Cipher</Nav.Link>
              <Nav.Link href="#link">DES</Nav.Link>
              <Nav.Link href="#link">Blowfish</Nav.Link>
              <Nav.Link href="#link">Block ECB</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default AlgoNavBar;