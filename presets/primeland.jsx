import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';

function App() {
  const [visible, setVisible] = useState(false);

  const menuItems = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'Features', icon: 'pi pi-fw pi-star' },
    { label: 'Docs', icon: 'pi pi-fw pi-file', url: 'https://primereact.org/documentation/', target: '_blank' },
    { label: 'About', icon: 'pi pi-fw pi-info-circle' }
  ];

  const start = <div className="text-2xl font-bold text-primary">Primeland</div>;
  const end = (
    <div className="flex align-items-center gap-3">
      <Button 
        label="Documentation" 
        icon="pi pi-book" 
        className="p-button-info hidden md:inline-flex"
        onClick={() => window.open('https://primereact.org/documentation/', '_blank')}
      />
      <Button label="Log In" className="p-button-text" />
      <Button label="Sign Up" />
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} className="p-button-rounded p-button-text md:hidden" />
    </div>
  );

  return (
    <div className="layout-wrapper">
      {/* Navbar */}
      <Menubar model={menuItems} start={start} end={end} className="border-noround shadow-2 mb-4" />
      
      {/* Mobile Sidebar */}
      <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-18rem">
        <h2 className="mt-0 mb-4 text-xl font-bold">Primeland</h2>
        <Divider />
        <div className="flex flex-column gap-2">
          {menuItems.map((item, i) => (
            <Button 
              key={i} 
              label={item.label} 
              icon={item.icon} 
              className="p-button-text justify-content-start w-full"
              onClick={() => item.url ? window.open(item.url, item.target) : null}
            />
          ))}
          <Button 
            label="PrimeReact Docs" 
            icon="pi pi-external-link" 
            className="p-button-info p-button-outlined justify-content-start w-full mt-3"
            onClick={() => window.open('https://primereact.org/documentation/', '_blank')}
          />
        </div>
      </Sidebar>
      
      {/* Hero Section */}
      <div className="gradient-bg py-8">
        <div className="container mx-auto px-3">
          <div className="grid">
            <div className="col-12 md:col-6 flex flex-column justify-content-center">
              <h1 className="text-5xl font-bold text-white mb-3">Build beautiful UIs with PrimeReact</h1>
              <p className="text-white text-xl line-height-3 mb-5">
                A comprehensive component library for React applications with 80+ flexible components, a responsive layout, and beautiful themes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button label="Get Started" className="p-button-rounded p-button-lg" />
                <Button 
                  label="Documentation" 
                  className="p-button-rounded p-button-lg p-button-outlined" 
                  icon="pi pi-external-link" 
                  onClick={() => window.open('https://primereact.org/documentation/', '_blank')}
                />
                <Button 
                  label="Component API" 
                  className="p-button-rounded p-button-lg p-button-outlined p-button-secondary" 
                  icon="pi pi-book" 
                  onClick={() => window.open('https://primereact.org/introduction/', '_blank')}
                />
              </div>
            </div>
            <div className="col-12 md:col-6 flex align-items-center justify-content-center">
              <div className="preview-card p-4 shadow-4 border-round-xl bg-white mt-5 md:mt-0">
                <div className="surface-card p-4 shadow-2 border-round">
                  <div className="text-center">
                    <i className="pi pi-prime text-6xl text-primary mb-3"></i>
                    <div className="text-900 text-xl mb-3 font-medium">Welcome to PrimeReact</div>
                    <p className="m-0 text-600 line-height-3 mb-4">Professional UI Components for React</p>
                    <div className="card-buttons flex justify-content-center">
                      <Button label="Dashboard" icon="pi pi-home" className="mr-2" />
                      <Button label="Settings" icon="pi pi-cog" className="p-button-outlined" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="surface-ground py-8">
        <div className="container mx-auto px-3">
          <h2 className="text-3xl font-bold text-center mb-5 text-900">Key Features</h2>
          <div className="grid mt-5">
            <div className="col-12 md:col-4 mb-4">
              <Card className="h-full">
                <div className="feature-card text-center">
                  <div className="mb-3 flex justify-content-center">
                    <div className="feature-icon bg-primary-100 p-3 border-circle">
                      <i className="pi pi-desktop text-2xl text-primary"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-900">Responsive Layout</h3>
                  <p className="m-0 line-height-3 text-700">
                    Create responsive applications with Flexbox-based responsive layouts that work on all screen sizes.
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-12 md:col-4 mb-4">
              <Card className="h-full">
                <div className="feature-card text-center">
                  <div className="mb-3 flex justify-content-center">
                    <div className="feature-icon bg-orange-100 p-3 border-circle">
                      <i className="pi pi-palette text-2xl text-orange-500"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-900">Theme Designer</h3>
                  <p className="m-0 line-height-3 text-700">
                    Create beautiful themes for your application with the extensive theming system and customize components.
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-12 md:col-4 mb-4">
              <Card className="h-full">
                <div className="feature-card text-center">
                  <div className="mb-3 flex justify-content-center">
                    <div className="feature-icon bg-purple-100 p-3 border-circle">
                      <i className="pi pi-check-circle text-2xl text-purple-500"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-900">Accessibility</h3>
                  <p className="m-0 line-height-3 text-700">
                    Build accessible applications with ARIA-compliant, screen reader-friendly UI components.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="surface-section py-8 text-center">
        <div className="container mx-auto px-3">
          <h2 className="text-3xl font-bold mb-4 text-900">Ready to Get Started?</h2>
          <p className="text-xl mb-5 text-700 line-height-3">Join thousands of developers who are building amazing applications with PrimeReact</p>
          <Button label="Start Building" size="large" className="p-button-primary p-button-rounded" />
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-900 py-6 text-white">
        <div className="container mx-auto px-3">
          <div className="grid">
            <div className="col-12 md:col-4 mb-4 md:mb-0">
              <h3 className="text-xl font-medium mb-3">Primeland</h3>
              <p className="line-height-3 text-gray-400 m-0">Modern UI development simplified with PrimeReact components.</p>
            </div>
            <div className="col-12 md:col-8">
              <div className="grid">
                <div className="col-6 md:col-3">
                  <h4 className="font-medium mb-3 text-sm uppercase text-gray-300">Products</h4>
                  <ul className="list-none p-0 m-0">
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">PrimeReact</a></li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">PrimeNG</a></li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">PrimeVue</a></li>
                  </ul>
                </div>
                <div className="col-6 md:col-3">
                  <h4 className="font-medium mb-3 text-sm uppercase text-gray-300">Resources</h4>
                  <ul className="list-none p-0 m-0">
                    <li className="mb-2">
                      <a 
                        className="text-gray-400 hover:text-white cursor-pointer"
                        onClick={() => window.open('https://primereact.org/documentation/', '_blank')}
                      >
                        Documentation
                      </a>
                    </li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">Themes</a></li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">Store</a></li>
                  </ul>
                </div>
                <div className="col-6 md:col-3">
                  <h4 className="font-medium mb-3 text-sm uppercase text-gray-300">Community</h4>
                  <ul className="list-none p-0 m-0">
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">Discord</a></li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">Twitter</a></li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">GitHub</a></li>
                  </ul>
                </div>
                <div className="col-6 md:col-3">
                  <h4 className="font-medium mb-3 text-sm uppercase text-gray-300">Legal</h4>
                  <ul className="list-none p-0 m-0">
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">Terms of Use</a></li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</a></li>
                    <li className="mb-2"><a className="text-gray-400 hover:text-white cursor-pointer">Licenses</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-top-1 border-gray-800 flex flex-column md:flex-row justify-content-between align-items-center">
            <div className="text-gray-400 text-sm mb-3 md:mb-0">© 2023 Primeland. All rights reserved.</div>
            <div className="flex gap-3">
              <Button icon="pi pi-github" className="p-button-rounded p-button-text p-button-sm" />
              <Button icon="pi pi-twitter" className="p-button-rounded p-button-text p-button-sm" />
              <Button icon="pi pi-discord" className="p-button-rounded p-button-text p-button-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
