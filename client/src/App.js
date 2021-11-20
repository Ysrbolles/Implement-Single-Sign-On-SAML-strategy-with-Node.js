import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'




function App() {

  const [email, setEmail] = useState("")

  useEffect(() => {
    // RedirectToLogin()
    axios({
      method: 'GET',
      url: 'http://localhost:1337/whoiamm',
      withCredentials: true,
    }).then(res => {
      console.log("--------------------------------");
      console.log(res);

      if (res.data.user.id) {
        setEmail(res.data.user.id)
      }
      // else {
      //   window.location.replace('http://localhost:1337/login-idp');
      // }
    })
      .catch(err => {
        console.log("kheryaaa", err);
        RedirectToLogin()
      })
  }, [])
  const RedirectToLogin = () => {
    window.location.replace('http://localhost:1337/login-idp');
   
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       {email &&  <p >
          Hello I'm {email}
        </p>}
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
