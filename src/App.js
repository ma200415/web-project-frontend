import './App.css';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Home from './components/home'
import SignIn from './components/signin'
import AppBar from './components/appbar'
import SignUp from './components/signup'
import ListDog from './components/dog/list'
import AddDog from './components/dog/add'
import EditDog from './components/dog/edit'

import { AuthContext } from "./authContext";
import { getAuthToken } from './helpers/utils'
import { getDecodedAuthToken } from './helpers/WebAPI'

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getAuthToken()) {
      getDecodedAuthToken().then((result) => {
        if (result.success) {
          setUser(result.payload);
        }
      });
    }
  }, []);

  const AddDogEl = () => {
    if (user != null) {
      return (user.admin ? <AddDog /> : "You do not have permisFsion")
    } else {
      return (<Navigate replace to="/signin" />)
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <AppBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/dog/list" element={<ListDog />} />
          <Route path="/dog/add" element={<AddDogEl />} />
          <Route path="/dog/edit" element={<EditDog />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}