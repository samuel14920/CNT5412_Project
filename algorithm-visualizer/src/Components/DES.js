import 'bootstrap/dist/css/bootstrap.css';
import './Caesar.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react';
const data = require("./Blowfish_Data.js");
let S= data.S; let P = data.P;
function DES() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [leftInitial, setLeftInitial] = useState(0);const [rightInitial, setRightInitial] = useState(0);
  const [leftEncrypted, setLeftEncrypted] = useState(0);const [rightEncrypted, setRightEncrypted] = useState(0);
  const [key, setKey] = useState([0x77AFA1C5, 0x20756060,
    0x85CBFE4E, 0x8AE88DD8, 0x7AAAF9B0, 0x4CF9AA7E,
    0x1948C25C, 0x02FB8A8C, 0x01C36AE4, 0xD6EBE1F9,
    0x90D4F869, 0xA65CDEA0, 0x3F09252D, 0xC208E69F]);
  
    useEffect(() => {

    }, [plaintext, decrypted]);

  // let binary_final = parseInt(combined).toString(2); console.log(binary_final);
  return (
    <>
        <h4>Blowfish Cipher</h4>
        <Container fluid style={{height: "100%"}} >
        <Row >
            <Col xs={4}sm={4}md={4}lg={4}xl={4}xxl={4}>
                <Image style={{height: "50%"}} fluid src="https://www.tutorialspoint.com/cryptography/images/des_structure.jpg" />
                <Image style={{height: "30%"}} fluid src="https://www.tutorialspoint.com/cryptography/images/round_function.jpg" />
            </Col>
            <Col xs={8}sm={8}md={8}lg={8}xl={8}xxl={8}>
              <Form.Label htmlFor="inputPassword5">Enter The Text to Encrypt here (8 Max)</Form.Label>
              <Form.Control
                maxLength={8}
                type="input"
                id="inputPassword"
                value={plaintext}
                aria-describedby="passwordHelpBlock"
                onChange={event => setPlaintext(event.target.value)}
              />
              <Form.Label htmlFor="inputPassword5">Enter The Key Here (14 Max)</Form.Label>
              <Form.Control
                maxLength={14}
                type="input"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                onChange={event => setKey(event.target.value)}
              />
              <Row xs={4}sm={4}md={4}lg={4}xl={4}xxl={4} style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Initial Left Half
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "25%"}}type="number" value= {leftInitial}/>

              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Initial Right Half
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "25%"}}type="number" value= {rightInitial} />
              </Row>

              <Form.Text id="plaintextEntry" muted>
                Encrypted
              </Form.Text>
              <Form.Control
                readOnly={true}
                type="input"
                value= {ciphertext}
                id="EncryptedPassword"
                aria-describedby="passwordHelpBlock"
              />
              <Row xs={4}sm={4}md={4}lg={4}xl={4}xxl={4} style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Encrypted Left Half
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "25%"}}type="number" value= {leftEncrypted}/>

              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Encrypted Right Half
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "25%"}}type="number" value= {rightEncrypted} />
              </Row>

              <Form.Text id="plaintextEntry" muted>
                Decrypted
              </Form.Text>
              <Form.Control
                readOnly={true}
                type="input"
                value= {decrypted}
                id="EncryptedPassword"
                aria-describedby="passwordHelpBlock"
              />
            </Col>
        </Row>
        </Container>
    </>
  );
}


export default DES;