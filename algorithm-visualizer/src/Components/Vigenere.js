import 'bootstrap/dist/css/bootstrap.css';
import './Caesar.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react';

function Vigenere() {

  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [input, setInput] = useState("");

  function CalculateVigenere(input, key){
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = ""; let newKey = ""; let j = 0;
    for(let i = 0; i < input.length; i++){
      if(j == key.length){
        j = 0;
      }
      newKey = newKey.concat(key[j]);
      j++;
    }
    for(let i = 0; i < input.length; i++){
      result = result.concat(alphabet.charAt(( alphabet.indexOf(input[i]) + alphabet.indexOf(newKey[i]) )%26));
    }
    setCiphertext(result);
  }

  return (
    <>
        <h4>Vigenere's Cipher</h4>
        <Container fluid style={{height: "100%"}} >
        <Row >
            <Col xs={4}sm={4}md={4}lg={4}xl={4}xxl={4}>
                <Image style={{height: "50%"}} fluid src="https://alchetron.com/cdn/blaise-de-vigenre-d166341d-c6d2-446d-bcab-6ff2e024c11-resize-750.jpg" />
                <Image style={{height: "40%"}} fluid src="https://static.javatpoint.com/tutorial/pwa/images/vigenere-cipher.png" />
            </Col>
            <Col xs={8}sm={8}md={8}lg={8}xl={8}xxl={8}>
              <Form.Label htmlFor="inputPassword5">Enter The Text to Encrypt here</Form.Label>
              <Form.Control
                type="input"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                onChange={event => setInput(event.target.value)}
                //onChange={Encrypt( CalculateCaesar(this.state.value ),  ) }
              />

              <div style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Key
              </Form.Text>
              <Form.Control style={{width: "70%"}}type="input" 
              onChange={event => setKey(event.target.value)}
               />
              </div>

              <div style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Submit
              </Form.Text>
              <Form.Control onClick={() => CalculateVigenere(input, key)} style={{width: "5%" , backgroundColor: "rgb(22, 236, 236)", outline: "none"}}type="button" />
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
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                The Vigenere Cipher can be thought of as a series of caesar ciphers; each character in the input is
                 encrypted by using the corresponding character in the key to determine the offset of that character's caesar cipher.
                  The key itself is repeated as many
                 times as necessary to match the length of the input. The cipher wasn't broken until 1863 using 
                 a method which relied mostly on frequency analysis (certain combinations of letters are common in language, making it easy to
                 guess particular words. Ex. "the", "and", "a", etc.)
              </Form.Text>
            </Col>
        </Row>
        </Container>
    </>
  );
}


export default Vigenere;