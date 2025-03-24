import { Button } from 'primereact/button';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #ffffff, #e0f7fa)',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#007ad9', marginBottom: '16px' }}>Welcome to PrimeLand</h1>
      <p style={{ fontSize: '16px', marginBottom: '24px' }}>Build modern UIs with PrimeReact.</p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button label="Get Started" className="p-button-raised p-button-primary" />
        <Button
          label="PrimeReact Docs"
          className="p-button-outlined"
          onClick={() => window.open('https://primereact.org/', '_blank')}
        />
      </div>
    </div>
  );
}

export default App;
