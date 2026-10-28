```tsx
import { useEffect } from 'react';
import Index from '@/pages/index';
import Schedule from '@/pages/schedule';
import '@/styles/App.css';

export default function App() {
  // Ensure the page scrolls to top on client-side navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Micro-Appointment Scheduler</h1>
      </header>

      <main className="main">
        <Index />
        <Schedule />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Micro-Appointment Scheduler. All rights reserved.</p>
      </footer>
    </div>
  );
}