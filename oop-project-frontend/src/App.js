import './App.css';
import React from 'react';
import Home from "./Pages/Home"
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import ChangeInfo from './Pages/ChangeInfo';
import Facilities from './Pages/Facilities';

class App extends React.Component {
 
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/change-info" exact element={<ChangeInfo />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/facilities" exact element={<Facilities />} />
        </Routes>
      </div>
    );
  }
}

export default App;
