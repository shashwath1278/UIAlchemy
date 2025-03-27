import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Space, Tooltip } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BookOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const openAntDocs = () => {
    window.open('https://ant.design/components/overview/', '_blank');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" style={{ color:'white' ,textAlign:"center",marginTop:'10px' }} ><h1>Ant Design</h1></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Analytics',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Uploads',
            },
          ]}
          style={{ marginTop: '16px' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              marginLeft: '8px',
            }}
          />
          <Space style={{ marginRight: 24 }}>
            <Tooltip title="Ant Design Documentation">
              <Button 
                type="primary" 
                icon={<BookOutlined />} 
                onClick={openAntDocs}
                style={{ marginRight: '12px' }}
              >
                Documentation
              </Button>
            </Tooltip>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#f0f7ff',
            borderRadius: borderRadiusLG,
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h1 style={{ 
            fontSize: '28px',
            color: '#1890ff',
            marginBottom: '16px'
          }}>Welcome to Ant Design</h1>
          <p style={{ 
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#444'
          }}>This is a starter template with Ant Design components.</p>
          <p style={{
            marginTop: '12px',
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#444'
          }}>Click the Documentation button to learn more about Ant Design components.</p>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
