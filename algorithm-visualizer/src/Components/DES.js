/* global BigInt */
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

//DISCLAIMER

//A GOOD CHUNK OF THIS IS AN IMITATION OF METHODS DESCRIBED ON WIKIPEDIA AND GEEKSFORGEEKS

function DES() {
  const [plaintext, setPlaintext] = useState("567899ABCD654321");
  const [ciphertext, setCiphertext] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [initialPermutation, setInitialPermutation] = useState("");
  const [leftInitial, setLeftInitial] = useState(0);const [rightInitial, setRightInitial] = useState(0);
  const [leftEncrypted, setLeftEncrypted] = useState(0);const [rightEncrypted, setRightEncrypted] = useState(0);
  const [K, setK] = useState("LLKU23162746RCWW");
  
    useEffect(() => {
      recalculate();
    }, [plaintext, decrypted, K]);


    function setNewPlainText(input){
      
      setPlaintext(input); recalculate();
    }
    function setKeyFromString(input){
      let answer = []
      for(let i = 0; i < input.length; i++){
        answer += input.charCodeAt(i);
      }
      while (answer.length < 16){
        answer += "0";
      }console.log(answer)
      setK(answer); recalculate();
    }

    function permute(k, arr, n){
      let per = "";
      for (let i = 0; i < n; i++) {
          per += k[arr[i] - 1]; //console.log(k[arr[i] - 1]);
      }
      console.log(per);
      return per;
      }
    function shift_left(k, numShifts)
    {
        let s = "";
        for (let i = 0; i < numShifts; i++) {
            for (let j = 1; j < 28; j++) {
                s += k[j];
            }
            s += k[0];
            k = s;
            s = "";
        }
        return k;
    }

    function text2Binary(input) {
      let output = "";
      for (var i = 0; i < input.length; i++) {
        let initial = input[i].charCodeAt(0).toString(2) + " "; //console.log(initial);
        while( initial.length < 9){
          initial = "0" + initial; //console.log(initial);
        }
        output += initial;
      }
      
      return output;
    }

    function hex2bin(s)
    {
      console.log(s)
        // hexadecimal to binary conversion
        const mp = new Map();
        mp.set('0', "0000");
        mp.set('1', "0001");
        mp.set('2', "0010");
        mp.set('3', "0011");
        mp.set('4', "0100");
        mp.set('5', "0101");
        mp.set('6', "0110");
        mp.set('7', "0111");
        mp.set('8', "1000");
        mp.set('9', "1001");
        mp.set('A', "1010");
        mp.set('B', "1011");
        mp.set('C', "1100");
        mp.set('D', "1101");
        mp.set('E', "1110");
        mp.set('F', "1111");
        let bin = "";
        for (let i = 0; i < s.length; i++) {
            bin += mp.get(s.charAt(i));  //console.log(mp[s.charAt(i)])
        }
        console.log(bin); return bin;
    }
    function bin2hex(s)
    {
        // binary to hexadecimal conversion
        const mp = new Map();
        mp.set("0000",'0' );
        mp.set("0001",'1' );
        mp.set("0010",'2' );
        mp.set("0011",'3' );
        mp.set("0100",'4' );
        mp.set("0101",'5' );
        mp.set("0110",'6' );
        mp.set("0111",'7');
        mp.set("1000",'8' );
        mp.set("1001",'9' );
        mp.set("1010",'A' );
        mp.set("1011",'B' );
        mp.set("1100",'C' );
        mp.set("1101",'D' );
        mp.set("1110",'E' );
        mp.set("1111",'F' );
        let hex = "";
        for (let i = 0; i < s.length; i += 4) {
            let ch = "";
            ch += s[i];
            ch += s[i + 1];
            ch += s[i + 2];
            ch += s[i + 3];
            hex += mp.get(ch);
        }
        return hex;
    }
    function xor_string(a, b)
    {
        let ans = "";
        for (let i = 0; i < a.length; i++) {
            if (a[i] == b[i]) {
                ans += "0";
            }
            else {
                ans += "1";
            }
        }
        return ans;
    }
    

    function encrypt(plaintext, rkb, rk){
            let pt = hex2bin(plaintext);
            let init_permutation = [58, 50, 42, 34, 26, 18, 10, 2,
              60, 52, 44, 36, 28, 20, 12, 4,
              62, 54, 46, 38, 30, 22, 14, 6,
              64, 56, 48, 40, 32, 24, 16, 8,
              57, 49, 41, 33, 25, 17, 9, 1,
              59, 51, 43, 35, 27, 19, 11, 3,
              61, 53, 45, 37, 29, 21, 13, 5,
              63, 55, 47, 39, 31, 23, 15, 7 ];
            console.log(pt)
            pt = permute(pt, init_permutation, 64);
            console.log("After initial permutation: ", pt, '\n'); setInitialPermutation(pt);

            let left = pt.substring(0, 32); console.log(left);setLeftInitial(left);
            let right = pt.substring(32); console.log(right);setRightInitial(right);
            console.log("After splitting: L0=",bin2hex(left), " R0=", bin2hex(right), '\n' );
            let expansion_D_Box = [32, 1, 2, 3, 4, 5, 4, 5,
              6, 7, 8, 9, 8, 9, 10, 11,
              12, 13, 12, 13, 14, 15, 16, 17,
              16, 17, 18, 19, 20, 21, 20, 21,
              22, 23, 24, 25, 24, 25, 26, 27,
              28, 29, 28, 29, 30, 31, 32, 1]

            let S_Boxes = [[[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
            [ 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
            [ 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
            [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ]],
              
          [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
              [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
              [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
            [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ]],
    
          [ [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
            [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
            [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
              [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ]],
        
            [ [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
            [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
            [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
              [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14] ],
          
            [ [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
            [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
              [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
            [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ]],
        
          [ [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
            [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
              [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
              [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13] ],
          
            [ [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
            [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
              [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
              [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12] ],
          
          [ [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
              [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
              [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
              [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11] ] ]
            //normal 32 permutation table
            let Permutation = [16, 7, 20, 21,
              29, 12, 28, 17,
              1, 15, 23, 26,
              5, 18, 31, 10,
              2, 8, 24, 14,
              32, 27, 3, 9,
              19, 13, 30, 6,
              22, 11, 4, 25]


              for (let i = 0; i < 16; i++) {
                // Expansion D-box
                let right_expanded = permute(right, expansion_D_Box, 48); //setRightExpanded
        
                // XOR RoundKey[i] and right_expanded
                let x = xor_string(rkb[i], right_expanded);
        
                // S-boxes
                let op = "";
                for (let i = 0; i < 8; i++) {
                    let row = 2 * (Number(x[i * 6]) - Number('0')) + (Number(x[i * 6 + 5]) - Number('0'));
                    let col = 8 * (Number(x[i * 6 + 1]) - Number('0')) + 4 * (Number(x[i * 6 + 2]) - Number('0')) + 2 * (Number(x[i * 6 + 3]) - Number('0')) + (Number(x[i * 6 + 4]) - Number('0'));

                    let val = S_Boxes[i][row][col]; //console.log(val)
                    op += op + val.toString(2)

                }
                //console.log(op)
                // Straight D-box
                op = permute(op, Permutation, 32);
                //console.log(op)
                // XOR left and op //FIX XOR SAM
                x = xor_string(op, left);
        
                left = x;
        
                // Swapper
                if (i != 15) {
                    let temp = left;
                    left = right;
                    right = temp;
                }
                console.log("Round", i + 1, " ", bin2hex(left), " ", bin2hex(right), " ", rk[i], '\n');

            }
        
            // Combination
            let combine = left + right;

            let final_permutation = [40, 8, 48, 16, 56, 24, 64, 32,
              39, 7, 47, 15, 55, 23, 63, 31,
              38, 6, 46, 14, 54, 22, 62, 30,
              37, 5, 45, 13, 53, 21, 61, 29,
              36, 4, 44, 12, 52, 20, 60, 28,
              35, 3, 43, 11, 51, 19, 59, 27,
              34, 2, 42, 10, 50, 18, 58, 26,
              33, 1, 41, 9, 49, 17, 57, 25]


            let cipher = bin2hex(permute(combine, final_permutation, 64));
            //let cipher = parseInt(permute(combine, final_permutation, 64), 2);
            return cipher;
    }

    function recalculate(){
        // pt is plain text
        let pt = plaintext.toUpperCase(); let key = K.toUpperCase();
    
        // Hex to binary
        key = hex2bin(key);
        console.log(key)
        // Parity bit drop table
        let keyp = [ 57, 49, 41, 33, 25, 17, 9,
                        1, 58, 50, 42, 34, 26, 18,
                        10, 2, 59, 51, 43, 35, 27,
                        19, 11, 3, 60, 52, 44, 36,
                        63, 55, 47, 39, 31, 23, 15,
                        7, 62, 54, 46, 38, 30, 22,
                        14, 6, 61, 53, 45, 37, 29,
                        21, 13, 5, 28, 20, 12, 4 ];
    
        // getting 56 bit key from 64 bit using the parity bits
        key = permute(key, keyp, 56); // key without parity
        console.log(key)
        // Number of bit shifts
        let shift_table = [ 1, 1, 2, 2,
                                2, 2, 2, 2,
                                1, 2, 2, 2,
                                2, 2, 2, 1 ];
    
        // Key- Compression Table
        let key_comp = [ 14, 17, 11, 24, 1, 5,
                            3, 28, 15, 6, 21, 10,
                            23, 19, 12, 4, 26, 8,
                            16, 7, 27, 20, 13, 2,
                            41, 52, 31, 37, 47, 55,
                            30, 40, 51, 45, 33, 48,
                            44, 49, 39, 56, 34, 53,
                            46, 42, 50, 36, 29, 32 ];
    
        // Splitting
        let left = key.substring(0, 28); console.log(left)
        let right = key.substring(28); console.log(right)
    
        let rkb = []; // rkb for RoundKeys in binary
        let rk = []; // rk for RoundKeys in hexadecimal
        for (let i = 0; i < 16; i++) {
            // Shifting
            left = shift_left(left, shift_table[i]);
            right = shift_left(right, shift_table[i]);
    
            // Combining
            let combine = left + right;
    
            // Key Compression
            let RoundKey = permute(combine, key_comp, 48);
    
            rkb.push(RoundKey);
            rk.push(bin2hex(RoundKey));
        }
 
    console.log("\nEncryption:\n\n");
    let cipher = encrypt(pt, rkb, rk);
    console.log("\nCipher Text: ", cipher, '\n'); setCiphertext(cipher);
 
    console.log("\nDecryption\n\n");

    let reversed_rkb = rkb.reverse();
    let reversed_rk = rk.reverse();
    let text = encrypt(cipher, reversed_rkb, reversed_rk); setDecrypted(text);
    console.log("\nPlain Text: ", text, '\n');
  }

  return (
    <>
        <h4>Blowfish Cipher</h4>
        <Container fluid style={{height: "100%"}} >
        <Row >
            <Col xs={6}sm={6}md={6}lg={6}xl={6}xxl={6}>
                <Image style={{height: "20%"}} fluid src="https://www.tutorialspoint.com/cryptography/images/des_structure.jpg" />
                <Image style={{height: "20%"}} fluid src="https://www.researchgate.net/profile/Marcelo-Lubaszewski/publication/220850878/figure/fig1/AS:394010326781952@1470950790085/Block-diagram-of-DES-algorithm.png" />
                <Image style={{height: "20%"}} fluid src="https://www.tutorialspoint.com/cryptography/images/round_function.jpg" />
            </Col>
            <Col xs={6}sm={6}md={6}lg={6}xl={6}xxl={6}>
              <Form.Label htmlFor="inputPassword5">Enter The Text to Encrypt here (Hexadecimal, 16 chars)</Form.Label>
              <Form.Control
                maxLength={16}
                type="input"
                id="inputPassword"
                value={plaintext}
                aria-describedby="passwordHelpBlock"
                onChange={event => setNewPlainText(event.target.value)}
              />
              <Form.Label htmlFor="inputPassword5">Enter The Key Here (Hexadecimal, 16 chars )</Form.Label>
              <Form.Control
                maxLength={16}
                type="input"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                onChange={event => setKeyFromString(event.target.value)}
              />
              <Form.Label htmlFor="inputPassword5">Initial Permutation (Hexadecimal, 16 chars )</Form.Label>
              <Form.Control
                maxLength={16}
                type="input"
                id="inputPassword"
                aria-describedby="passwordHelpBlock"
                value={initialPermutation}
              />
              <Row xs={4}sm={4}md={4}lg={4}xl={4}xxl={4} style={{ padding: "10px"}}>
              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Left Half After IP
              </Form.Text>
              <Form.Control readOnly={true} style={{width: "25%"}}type="number" value= {leftInitial}/>

              <Form.Text style={{float: "left", paddingRight:"10px"}} id="plaintextEntry" muted>
                Right Half After IP
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