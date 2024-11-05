import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import Home from './home.js';
import AuthForm from './components/AuthForm.js';

function App() {
  return (
    <Router basename="/PandaPort">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />


      </Routes>
    </Router>
  );
}

export default App;