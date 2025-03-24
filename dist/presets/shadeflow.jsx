function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to Shadeflow</h1>
      <p className="text-lg mb-6">A modern UI stack powered by Tailwind CSS and ShadCN.</p>
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
          Get Started
        </button>
        <a
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Tailwind Docs
        </a>
        <a
          href="https://ui.shadcn.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          ShadCN Docs
        </a>
      </div>
    </div>
  );
}

export default App;
