import React from 'react'
import Left from "./Home/left/Left"
import Right from "./Home/right/Right"
import Signup from './components/Signup'
import Login from './components/Login'
import Loading from './components/Loading'
import { useAuth } from './context/AuthProvider'
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              // <div className="flex h-screen">
              //   <Left />
              //   <Right />
              // </div>
              <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle "
                />
                <div className="flex flex-col items-center justify-center h-screen drawer-content">
                  <Right />
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="flex flex-col h-screen min-h-full bg-gray-300 w-80 ">
                    <Left />
                  </ul>
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
