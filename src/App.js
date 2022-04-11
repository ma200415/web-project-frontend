import './App.css';

import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './components/home'
import SignIn from './components/signin'
import AppBar from './components/appbar'
import SignUp from './components/signup'
import ListDog from './components/dog/list'
import AddDog from './components/dog/add'

import { AuthContext } from "./contexts";
import { getAuthToken } from './helpers/utils'
import { getDecodedAuthToken } from './helpers/WebAPI'

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getAuthToken()) {
      getDecodedAuthToken().then((result) => {
        if (result.success) {
          setUser(result.payload);  //todo don't store password
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <AppBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/dog/list" element={<ListDog />} />
          <Route path="/dog/add" element={<AddDog />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}