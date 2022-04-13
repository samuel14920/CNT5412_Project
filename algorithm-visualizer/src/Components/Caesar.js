import 'bootstrap/dist/css/bootstrap.css';
import './Caesar.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react';

function Caesar() {

  const [ciphertext, setCiphertext] = useState("");
  const [modulus, setModulus] = useState(0);
  const [input, setInput] = useState("");

  function CalculateCaesar(input, offset){
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = ""; let shifted =''; let alphabet_index = 0;
    for(let i = 0; i < input.length;  i++){
      alphabet_index = alphabet.indexOf(input[i]);
      shifted = alphabet.charAt((alphabet_index + offset) % 26);
      result = result.concat(shifted);
    }
    setCiphertext(result);
  }

  return (
    <>
        <h4>Caesar's Cipher</h4>
        <Container fluid style={{height: "100%"}} >
        <Row >
            <Col xs={4}sm={4}md={4}lg={4}xl={4}xxl={4}>
                <Image style={{height: "50%"}} fluid src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Jules_cesar.jpg" />
                <Image style={{height: "30%"}} fluid src="https://higherlogicdownload.s3.amazonaws.com/IMWUC/UploadedImages/92757287-d116-4157-b004-c2a0aba1b048/Caesar_cipher.png" />
            </Col>
            <Col xs={8}sm={8}md={8}lg={8}xl={8}xxl={8}>
              <Form.Label htmlFor="inputPassword5">Enter The Text to Encrypt here</Form.Label>
              <Form.Control
                type="input"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                onChange={event => setInput(event.target.value)}
                //onChange={Encrypt( CalculateCaesar(this.state.value ), }
              />

              <div style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Offset
              </Form.Text>
              <Form.Control style={{width: "10%"}}type="number" 
              onChange={event => setModulus(event.target.value)}
               />
              </div>

              <div style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Submit
              </Form.Text>
              <Form.Control onClick={() => CalculateCaesar(input, Number(modulus))} style={{width: "5%" , backgroundColor: "rgb(22, 236, 236)", outline: "none"}}type="button" />
              </div>

              <Form.Text id="plaintextEntry" muted>
                Encryption Result
              </Form.Text>
              <Form.Control
                readOnly={true}
                type="input"
                value= {ciphertext}
                id="EncryptedPassword"
                aria-describedby="passwordHelpBlock"
              />
            </Col>
        </Row>
        </Container>
    </>
  );
}


export default Caesar;