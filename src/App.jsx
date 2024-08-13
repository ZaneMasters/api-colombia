import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import './styles/styles.css';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/colombia_dash" />} />
            <Route path="/colombia_dash" element={<Dashboard />} />
        </Routes>
    </Router>
);

export default App;

