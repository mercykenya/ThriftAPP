import React, { useEffect, useState } from 'react';
import thriftNuLogo from './logo.png';
import { useNavigate, Link } from 'react-router-dom';
import "./SignInPage.css"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase";



function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState("")
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    createUserWithEmailAndPassword(auth, email.toLowerCase(), password).then(()=>{
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user
        if (user) {
          navigate('/home');
        }
      }).catch((error) => {
        console.log(error.message)
        setError(error.message)
      });
      navigate('/home');
    }).catch((error) => {
      setError(error.message)
    });
  };
  

  return (
    <div className="signin-container">
      <div className="logo-container">

        <img src={thriftNuLogo} alt="ThriftNu Logo" className="thrift-nu-logo" />
        <div className="thrift-nu-text">ThriftNu</div>
        <div className="tagline">A Cheaper Solution for Books</div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Sign Up</button>
          
        </form>
        <><Link to="/">Login</Link></>
        {error}
      </div>
    </div>
  );
}

export default SignUp;
