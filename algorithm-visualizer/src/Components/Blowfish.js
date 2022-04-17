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
function Blowfish() {
  const [ciphertext, setCiphertext] = useState("");
  const [modulus, setModulus] = useState(0);
  const [input, setInput] = useState("");

  function encode(str) {
    return str.replace(/./g, function(c) {
        return ('00' + c.charCodeAt(0)).slice(-3);
    });
  }

  function decode(str) {
      return str.replace(/.{3}/g, function(c) {
          return String.fromCharCode(c);
      });
  }

  function text2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
  }
  function dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }
  
  function CalculateCaesar(input, offset){
    //console.log(data.S, data.P);
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = ""; let shifted =''; let alphabet_index = 0;
    for(let i = 0; i < input.length;  i++){
      alphabet_index = alphabet.indexOf(input[i]);
      shifted = alphabet.charAt((alphabet_index + offset) % 26);
      result = result.concat(shifted);
    }
    setCiphertext(result);
  }

  function f_function(n){
    let intermediate = S[0][n & (2^8 - 1)] + S[1][ (n >> 16) << 16 & 0xff];
    let answer = (intermediate ^ S[2][n >> 8 & 0xff]) + S[3][n & 0xff];
    return answer;
  }

  function Encrypt(l, r){
        for(let i = 0; i < 16; i++){
            l = l ^ P[i]; 
            r = f_function(l) ^ r;
            let temp = l; l = r; r = temp; //console.log(l, r);
        }
        let temp = l; l = r; r = temp;
        r = r ^ P[16]; console.log(l);
        l = l ^ P[17];
        return [l, r];
  }

  function Decrypt(l, r){
    for(let i = 17; i > 1; i--){
          l = l^ P[i]; console.log(l);
          r = f_function(l) ^ r;
          let temp = l;l = r; r = temp; //console.log(l, r);
        }
        let temp = l; l = r; r = temp;
        r = r ^ P[1];
        l = l ^ P[0];
        return [l, r];
  }

  function Init_Subkeys(key){
    for(let i = 0; i < 18; i++){
            P[i] = P[i] ^ key[i % 14];
          }
        // # c = 0
        // # for i in range(0, 18):
        // #     base = 0
        // #     for j in range(0, 4):
        // #         base = (base << 8) | int(str(key)[c: c + 8])  # & (2**8 - 1)
        // #         c = (c + 1) % len(str(key))
        // #     P[i] ^= base

        //# 521 iteration subkey calculation
        let left, right = 0;
        for(let i = 0; i < 18; i+=2){
            let result = Encrypt(left, right);
            left = result[0]; right = result[1];
            P[i] = left; //console.log(P[i])
            P[i + 1] = right; //console.log(P[i + 1])
        }
        for(let i = 0; i < 4; i++){
          for(let j = 0; j < 256; j+=2){
                let result = Encrypt(left, right);
                left = result[0]; right = result[1];
                S[i][j] = left;
                S[i][j + 1] = right;
          }
        }
  }

  let key = [0x77AFA1C5, 0x20756060,
          0x85CBFE4E, 0x8AE88DD8, 0x7AAAF9B0, 0x4CF9AA7E,
          0x1948C25C, 0x02FB8A8C, 0x01C36AE4, 0xD6EBE1F9,
          0x90D4F869, 0xA65CDEA0, 0x3F09252D, 0xC208E69F];
  let plaintext = "Hello World";
  //let plaintext_bytes = encode(plaintext);
  let utf8Encode = new TextEncoder();
  let plaintext_bytes = text2Binary(plaintext);
  console.log(plaintext_bytes);
  plaintext_bytes = plaintext_bytes.replace(/\s/g, '');
  let left_string = (plaintext_bytes.substring(0,32)); let left_rep = parseInt(left_string, 2);console.log(left_rep);
  let right_string = (plaintext_bytes.substring(32,64)); let right_rep = parseInt(right_string, 2);console.log(right_rep);
  // console.log(left_string); console.log(right_string);
  // console.log(plaintext_bytes);
  //let binary_rep = parseInt(plaintext_bytes, 2);
  // console.log(binary_rep);
  // console.log(dec2bin(right_rep));
  // console.log(encode(plaintext));
  // console.log(key)
  //console.log(int.from_bytes(plaintext_bytes, "big"));
  //left_text = int.from_bytes(plaintext_bytes, "big") & (2 ^ 32 - 1);
  //let left_text = plaintext_bytes & (2 ^ 32 - 1);
  //right_text = int.from_bytes(plaintext_bytes, "big") << 32;
  //let right_text = plaintext_bytes << 32;
  console.log(left_rep, right_rep);
  console.log(P);
  Init_Subkeys(key); console.log(P);
  let result = Encrypt(left_rep, right_rep);
  let left = result[0]; let right = result[1];
  console.log(left, right);
  console.log(P)
  let final = Decrypt(left, right);
  left = final[0]; right = final[1];
  console.log(left, right);


  return (
    <>
        <h4>Blowfish Cipher</h4>
        <Container fluid style={{height: "100%"}} >
        <Row >
            <Col xs={4}sm={4}md={4}lg={4}xl={4}xxl={4}>
                <Image style={{height: "50%"}} fluid src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Blowfish_diagram.png" />
                <Image style={{height: "30%"}} fluid src="https://thumbs.dreamstime.com/b/photo-prepared-blowfish-against-blurred-background-front-view-blow-fish-porcupine-fish-155353317.jpg" />
            </Col>
            <Col xs={8}sm={8}md={8}lg={8}xl={8}xxl={8}>
              <Form.Label htmlFor="inputPassword5">Enter The Text to Encrypt here</Form.Label>
              <Form.Control
                maxLength={8}
                type="input"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                onChange={event => setInput(event.target.value)}
                //onChange={Encrypt( CalculateCaesar(this.state.value ), }
              />
              <Form.Label htmlFor="inputPassword5">Enter The Key Here</Form.Label>
              <Form.Control
                maxLength={8}
                type="input"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                onChange={event => setInput(event.target.value)}
                //onChange={Encrypt( CalculateCaesar(this.state.value ), }
              />
              <Row xs={4}sm={4}md={4}lg={4}xl={4}xxl={4} style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Initial Left Half
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "20%"}}type="number" value= {left_rep}/>

              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Initial Right Half
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "20%"}}type="number" value= {right_rep} />
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
              <Form.Control readOnly={true} style={{width: "20%"}}type="number" value= {left_rep}/>

              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Encrypted Right Half
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "20%"}}type="number" value= {right_rep} />
              </Row>

              <Form.Text id="plaintextEntry" muted>
                Decrypted
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


export default Blowfish;