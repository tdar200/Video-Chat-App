import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

function CustomerSupport() {
  return (
    <div>
      <Container>
        <img
          style={{ width: "100%", height: "400px" }}
          src="https://www.kmslh.com/wp-content/uploads/2017/10/Benefits-of-Knowledge-Base-for-Call-Centers-768x402.jpg"
        />
        <h1 style={{ textAlign: "center" }}>Contact our Support Team</h1>
        <Card style={{ marginBottom: "1rem" }}>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  as={Col}
                  controlId="formPlaintextEmail"
                >
                  <Form.Label>First Name</Form.Label>
                  <Col sm="10">
                    <Form.Control placeholder="First Name" />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Col>
                    <Form.Control placeholder="Last Name" />
                  </Col>
                </Form.Group>
              </Row>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder="Email Address" />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Session ID
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Session ID" />
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <Row style={{ justifyContent: "space-around", marginBottom: "1rem" }}>
          <Card style={{ width: "18rem", textAlign: "center" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>Call Us</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
                risus, ornare ac tortor at, lacinia mattis sapien.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem", textAlign: "center" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>Contact in Chat</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
                risus, ornare ac tortor at, lacinia mattis sapien.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <FontAwesomeIcon icon={solid('user-secret')} />
    </div>
  );
}

export default CustomerSupport;
