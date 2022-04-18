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

import BookDog from './components/booking/book'
import ListBooking from './components/booking/list'

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

  const AuthEl = (props) => {
    if (user != null) {
      switch (props.page) {
        case "dogAdd":
          return user.role === "employee" ? <AddDog /> : "You do not have permission to access"
        case "dogEdit":
          return <EditDog />
        case "bookingBook":
          return <BookDog />
        case "bookingList":
          return <ListBooking />
        case "mylist":
          return <ListDog mode="mylist" />
        default:
          break;
      }
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
          <Route path="/dog/add" element={<AuthEl page="dogAdd" />} />
          <Route path="/dog/edit" element={<AuthEl page="dogEdit" />} />
          <Route path="/booking/book" element={<AuthEl page="bookingBook" />} />
          <Route path="/booking/list" element={<AuthEl page="bookingList" />} />
          <Route path="/mylist" element={<AuthEl page="mylist" />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}