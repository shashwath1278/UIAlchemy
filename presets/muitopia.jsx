function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-semibold text-purple-700">Muitopia</span>
            </div>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#" className="text-gray-600 hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium">Resources</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100">
              Log in
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              Sign up
            </button>
          </div>
          <div className="md:hidden">
            <button className="bg-white p-2 rounded-md text-gray-400 hover:text-purple-500 hover:bg-gray-100">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Build beautiful interfaces with Material Design
              </h1>
              <p className="text-xl mb-8 text-indigo-50">
                Muitopia helps you create stunning applications with a comprehensive suite of Material UI components. Fast, accessible, and customizable.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <button className="px-6 py-3 bg-white text-purple-600 font-medium rounded shadow-md hover:bg-gray-100">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-purple-700 text-white font-medium rounded shadow-md hover:bg-purple-800">
                  View Components
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4">
                  {/* Feature boxes */}
                  <div className="bg-white bg-opacity-90 p-4 rounded shadow">
                    <h3 className="font-semibold text-gray-900">Components</h3>
                    <p className="text-sm text-gray-600 mt-1">Pre-built UI elements</p>
                  </div>
                  <div className="bg-white bg-opacity-90 p-4 rounded shadow">
                    <h3 className="font-semibold text-gray-900">Customization</h3>
                    <p className="text-sm text-gray-600 mt-1">Personalize your UI</p>
                  </div>
                  <div className="bg-white bg-opacity-90 p-4 rounded shadow">
                    <h3 className="font-semibold text-gray-900">Theming</h3>
                    <p className="text-sm text-gray-600 mt-1">Create your palette</p>
                  </div>
                  <div className="bg-white bg-opacity-90 p-4 rounded shadow">
                    <h3 className="font-semibold text-gray-900">Responsive</h3>
                    <p className="text-sm text-gray-600 mt-1">Works on all devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature cards */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Material Design</h3>
              <p className="text-gray-600">Follow Google's Material Design principles to create intuitive, consistent user experiences.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Component Library</h3>
              <p className="text-gray-600">Access a comprehensive suite of ready-to-use UI components that follow Material Design specifications.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Accessibility</h3>
              <p className="text-gray-600">Built with accessibility in mind, ensuring your applications are usable by everyone.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold">Muitopia</span>
            <p className="text-gray-400 mt-1">Material design made easy</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">Github</a>
            <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-300 hover:text-white">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
