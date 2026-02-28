import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Reading from './components/Reading';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0510] text-white selection:bg-indigo-500/30 font-sans relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow pt-16 px-6 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reading/:categoryId" element={<Reading />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
