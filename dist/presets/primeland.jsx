import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';

function App() {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
      life: 3000
    });
  };

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home'
    },
    {
      label: 'Features',
      icon: 'pi pi-fw pi-star'
    },
    {
      label: 'Projects',
      icon: 'pi pi-fw pi-briefcase'
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Toast ref={toast} />
      
      <div style={{ padding: "1rem" }}>
        <Menubar 
          model={items} 
          start={
            <Button 
              icon="pi pi-bars" 
              onClick={() => setVisible(true)} 
              text 
              rounded 
              aria-label="Menu" 
              style={{ marginRight: "1rem" }}
            />
          } 
          end={
            <div style={{ width: "12rem" }}>
              <InputText placeholder="Search" type="text" style={{ width: "100%" }} />
            </div>
          }
          style={{ 
            marginBottom: "1rem", 
            border: "none",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            padding: "0.5rem 1rem"
          }}
          className="p-menubar-custom"
        />
      </div>
      
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h2 style={{ color: "#6366F1" }}>PrimeReact Menu</h2>
        <p style={{ color: "#64748B", marginBottom: "1rem" }}>Explore the powerful components</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button label="Dashboard" icon="pi pi-home" text style={{ marginBottom: "0.5rem", justifyContent: "flex-start" }} />
          <Button label="Components" icon="pi pi-th-large" text style={{ marginBottom: "0.5rem", justifyContent: "flex-start" }} />
          <Button label="Templates" icon="pi pi-palette" text style={{ marginBottom: "0.5rem", justifyContent: "flex-start" }} />
          <Button label="Documentation" icon="pi pi-book" text style={{ marginBottom: "0.5rem", justifyContent: "flex-start" }} />
        </div>
      </Sidebar>

      <div style={{ padding: "1rem 2rem", flex: 1 }}>
        <div style={{ 
          borderRadius: "12px", 
          backgroundColor: "#f0f7ff", 
          padding: "2rem", 
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          height: "100%"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            marginBottom: "1rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <h1 style={{ color: "#6366F1", margin: 0 }}>PrimeReact Starter</h1>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button 
                label="Documentation" 
                icon="pi pi-external-link" 
                outlined 
                onClick={() => window.open('https://primereact.org/documentation/', '_blank')} 
              />
              <Button label="Show Toast" icon="pi pi-check" onClick={showSuccess} />
            </div>
          </div>
          
          <Divider />
          
          <h2 style={{ color: "#6366F1", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
            Welcome to PrimeReact
          </h2>
          <p style={{ color: "#64748B" }}>
            This starter template demonstrates some of the core features of PrimeReact, a comprehensive UI component library for React. 
            Begin building your application with this beautifully styled starting point.
          </p>
          
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            margin: "1rem -0.5rem 0", 
            gap: "1rem"
          }}>
            <Card 
              title="Powerful Components" 
              subTitle="Over 90+ UI components" 
              style={{ 
                flex: '1 1 100%', 
                minWidth: '250px',
                margin: '0.5rem',
                background: 'linear-gradient(to right, #f8fbff, #edf5ff)'
              }}
            >
              <p>PrimeReact provides a comprehensive suite of accessible UI components with different themes to choose from.</p>
              <Button label="Learn More" text icon="pi pi-angle-right" iconPos="right" style={{ marginTop: "0.75rem" }} />
            </Card>
            
            <Card 
              title="Responsive Layout" 
              subTitle="Designed for all devices"
              style={{ 
                flex: '1 1 calc(50% - 2rem)', 
                minWidth: '250px',
                margin: '0.5rem',
                background: 'linear-gradient(to right, #f8fbff, #edf5ff)'
              }}
            >
              <p>Create responsive layouts easily with PrimeFlex, a CSS utility library designed to work seamlessly with PrimeReact components.</p>
              <Button label="Learn More" text icon="pi pi-angle-right" iconPos="right" style={{ marginTop: "0.75rem" }} />
            </Card>
            
            <Card 
              title="Ready-to-use Templates" 
              subTitle="Start fast with templates"
              style={{ 
                flex: '1 1 calc(50% - 2rem)', 
                minWidth: '250px',
                margin: '0.5rem',
                background: 'linear-gradient(to right, #f8fbff, #edf5ff)'
              }}
            >
              <p>Explore ready-to-use templates and UI blocks to jumpstart your development process.</p>
              <Button label="Learn More" text icon="pi pi-angle-right" iconPos="right" style={{ marginTop: "0.75rem" }} />
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        .p-menubar-custom .p-menubar-root-list {
          gap: 1.5rem;
          align-items: center;
        }
        .p-menubar-custom .p-menuitem {
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default App;
