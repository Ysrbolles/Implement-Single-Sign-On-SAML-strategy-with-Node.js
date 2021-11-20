import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'




function App() {

  const [email, setEmail] = useState("")

  useEffect(() => {
    // RedirectToLogin()

  }, [])
  const RedirectToLogin = () => {
    window.location.replace('http://localhost:1337/login-idp');
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"  />
        <p>
          Hello I'm {email}
        </p>
        <a
         onClick={() => RedirectToLogin()}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
