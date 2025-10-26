import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-white antialiased">
      <Hero />
      <Features />
      <Demo />
      <Footer />
    </div>
  );
}

export default App;
