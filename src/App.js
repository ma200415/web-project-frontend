import './App.css';

import { Routes, Route } from "react-router-dom";

import Home from './components/home'
import SignIn from './components/signin'
import AppBar from './components/appbar'
import SignUp from './components/signup'

function App() {
  return (
    <div className="App">
      <AppBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
