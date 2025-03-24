import { Button, Typography, Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
        backgroundColor: '#f0f2f5',
        backgroundSize: 'cover',
      }}
    >
      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography.Title level={1} style={{ color: '#1890ff' }}>
          Welcome to AntVerse
        </Typography.Title>
        <Typography.Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          Build elegant UIs with Ant Design.
        </Typography.Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button type="primary" size="large">
            Get Started
          </Button>
          <Button
            type="default"
            size="large"
            href="https://ant.design/docs/react/introduce"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ant Docs
          </Button>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
