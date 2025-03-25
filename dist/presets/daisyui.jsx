function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">DaisyUI App</a>
          </div>
          <div className="flex-none hidden md:block">
            <ul className="menu menu-horizontal px-1">
              <li><a>Home</a></li>
              <li><a>Features</a></li>
              <li><a>Pricing</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
          <div className="flex-none md:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Home</a></li>
                <li><a>Features</a></li>
                <li><a>Pricing</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold">Build beautiful UIs with DaisyUI</h1>
              <p className="py-6">The most popular, free and open-source Tailwind CSS component library with fully customizable components.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-outline btn-primary">Documentation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center">
                  <div className="badge badge-primary p-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
                <h2 className="card-title justify-center">Responsive Components</h2>
                <p className="text-center">All components are fully responsive and adapt to any screen size.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center">
                  <div className="badge badge-secondary p-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                </div>
                <h2 className="card-title justify-center">Theme System</h2>
                <p className="text-center">Built-in theme system with dark mode support and customizable colors.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center">
                  <div className="badge badge-accent p-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h2 className="card-title justify-center">Utility-first CSS</h2>
                <p className="text-center">Powered by Tailwind CSS, allowing for rapid UI development with utility classes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="mb-8 max-w-lg mx-auto">Join thousands of developers who are building amazing apps with DaisyUI and Tailwind CSS.</p>
            <button className="btn btn-primary">Start Building</button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content mt-auto">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div>
              <span className="footer-title">Products</span> 
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </div> 
            <div>
              <span className="footer-title">Company</span> 
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </div> 
            <div>
              <span className="footer-title">Legal</span> 
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-content pt-8 flex justify-between">
            <div>
              <p>© 2023 DaisyUI App - All rights reserved</p>
            </div>
            <div className="flex gap-4">
              <a className="link link-hover">GitHub</a>
              <a className="link link-hover">Twitter</a>
              <a className="link link-hover">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
