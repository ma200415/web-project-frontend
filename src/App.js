import './App.css';

import { Routes, Route, Link } from "react-router-dom";

import Home from './components/home'
import Login from './components/login'
import AppBar from './components/appbar'

function App() {
  return (
    <div className="App">
    <AppBar/>      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
