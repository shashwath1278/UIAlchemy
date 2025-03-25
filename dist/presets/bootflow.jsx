import { Container, Button, Row, Col, Card, Nav, Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" bg="primary" variant="dark" className="mb-4 px-3 py-2">
        <Container>
          <Navbar.Brand href="#home">BootFlow</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-3">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
            <div className="d-flex">
              <Button variant="outline-light">Sign In</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="mb-5 flex-grow-1">
        <Row className="justify-content-center mb-5">
          <Col md={10} lg={8} className="text-center">
            <h1 className="display-4 text-primary mb-3">Welcome to BootFlow</h1>
            <p className="lead mb-4">Create responsive UIs with Bootstrap's powerful, responsive grid system and components.</p>
            <div className="d-flex gap-3 justify-content-center">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                href="https://getbootstrap.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bootstrap Docs
              </Button>
            </div>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Responsive Layout</Card.Title>
                <Card.Text>Build responsive, mobile-first projects using Bootstrap's powerful grid system.</Card.Text>
                <Button variant="link" className="p-0 mt-auto align-self-start">Learn more →</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>UI Components</Card.Title>
                <Card.Text>Extensive library of carefully crafted components ready for your project.</Card.Text>
                <Button variant="link" className="p-0 mt-auto align-self-start">Learn more →</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Customizable</Card.Title>
                <Card.Text>Easily customize Bootstrap's variables to create your own unique design.</Card.Text>
                <Button variant="link" className="p-0 mt-auto align-self-start">Learn more →</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <footer className="bg-light py-4 mt-auto">
        <Container className="text-center">
          <p className="mb-0 text-muted">Built with BootFlow - Bootstrap 5 React Template</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
