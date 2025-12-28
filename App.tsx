import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UniversalPage from './src/pages/UniversalPage';
import Lenis from 'lenis';
import { AuthProvider } from './src/contexts/AuthContext';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  
  // Initialize Lenis for that "expensive" scroll feel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      // FIX: 'direction' is renamed to 'orientation' in newer Lenis versions
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          {/* 
             The "Universal Route" 
             Matches everything. UniversalPage fetches config based on domain.
          */}
          <Route path="*" element={<UniversalPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;