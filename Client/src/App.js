import React , {useState} from 'react'
import Axios from 'axios'

import './App.css';

function App() {
  const [user , setUser] = useState("")
  const [pass , setPass] = useState("")
  const token = '111111111111111111'; //token from local.storage
  const login = () => {
    Axios({
      method : "POST",
      data : {user : user , pass : pass},
      widthCredentials : true,
      url : "http://localhost/login",
      "headers": {
        'Authorization': `Bearer ${token}`
    }
    }).then((response) => console.log(response))
    .catch(error => {
      console.log(error);
    })
  }
  return (
    <div className="App">
        <input type="text" onChange={(event) => setUser(event.target.value)} placeholder='user' value={user}/>
        <input type="password" onChange={(event) => setPass(event.target.value)} placeholder='password' value={pass}/>
        <button type="button" onClick={login}>Login</button>
    </div>
  );
}

export default App;
