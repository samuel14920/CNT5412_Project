import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

function Caesar() {
  return (
    <>
        <h4>Caesar's Cipher</h4>
        <Container fluid style={{height: "100%"}} >
        <Row >
            <Col xs={4}sm={4}md={4}lg={4}xl={4}xxl={4}>
                <Image style={{height: "50%"}} fluid src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Jules_cesar.jpg" />
                <Image style={{height: "30%"}} fluid src="https://higherlogicdownload.s3.amazonaws.com/IMWUC/UploadedImages/92757287-d116-4157-b004-c2a0aba1b048/Caesar_cipher.png" />
            </Col>
            <Col xs={8}sm={8}md={8}lg={8}xl={8}xxl={8}></Col>
        </Row>
        </Container>
    </>
  );
}

export default Caesar;