import { Container, Button } from 'react-bootstrap';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(45deg, #f8f9fa 25%, #e9ecef 25%, #e9ecef 50%, #f8f9fa 50%, #f8f9fa 75%, #e9ecef 75%, #e9ecef)',
        backgroundSize: '56px 56px',
      }}
    >
      <Container>
        <h1 className="display-4 text-primary mb-3">Welcome to BootFlow</h1>
        <p className="lead mb-4">Create responsive UIs with Bootstrap.</p>
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
      </Container>
    </div>
  );
}

export default App;
