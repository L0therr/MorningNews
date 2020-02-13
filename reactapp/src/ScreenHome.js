import React, {useState, useEffect} from 'react';
//REDUX
import {connect} from 'react-redux';

import './App.css';
import {Input,Button} from 'antd';
import {Redirect } from 'react-router-dom';

function ScreenHome(props) {

  //siLogged
  const [isLogged, setIsLogged] = useState(false);
  //login
  const [logMail, setLogMail] = useState('');
  const [logPswd, setLogPswd] = useState('');
  //signin
  const [signName, setSignName] = useState('');
  const [signMail, setSignMail] = useState('');
  const [signPswd, setSignPswd] = useState('');
  //status
  const [signError, setSignError] = useState('');
  const [logError, setLogError] = useState('');
  
  //sign
  var handleSign = async () => {
    var rawResponse = await fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `username=${signName}&email=${signMail}&pswd=${signPswd}`
    });
    var res = await rawResponse.json();
    if (res.result === true) {
      setSignError(res.error);
      setIsLogged(true);
      props.addToken(res.currentUser.token)
    } else {
      setSignError(res.error);
      setSignName('');
      setSignMail('');
      setSignPswd('');
    }
  }

  //login
  var handleLog = async () => {
    var rawResponse = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${logMail}&pswd=${logPswd}`
    });
    var res = await rawResponse.json();
    if (res.result === true) {
      setLogError(res.error);
      setIsLogged(true);
      props.addToken(res.currentUser.token)
    } else {
      setLogError(res.error);
      setLogMail('');
      setLogPswd('');
    }
  }

  if (isLogged === true) {
    return (<Redirect to='/sources' />);
  } else {
    return (
      <div className="Login-page" >
  
            {/* SIGN-IN */}
            <div className="Sign">
              <Input className="Login-input" placeholder="Email"
              onChange={(e) => setLogMail(e.target.value)}
              value={logMail}
              />
              <Input.Password className="Login-input" placeholder="Password"
              onChange={(e) => setLogPswd(e.target.value)}
              />
  
              <p>{logError}</p>
  
              <Button style={{width:'80px'}} type="primary"
              onClick={() => handleLog()}
            >Login</Button>
            
            </div>
  
            {/* SIGN-UP */}
  
            <div className="Sign">
  
            <Input required className="Login-input" placeholder="Username"
              onChange={(e) => setSignName(e.target.value)}
              value={signName}
            />
  
            <Input required className="Login-input" placeholder="Email"
              onChange={(e) => setSignMail(e.target.value)}
              value={signMail}
            />
  
            <Input.Password required className="Login-input" placeholder="Password"
              onChange={(e) => setSignPswd(e.target.value)}
              value={signPswd}
            />
  
            <p>{signError}</p>
            
            <Button style={{width:'80px'}} type="primary"
              onClick={() => handleSign()}
            >Sign-up</Button>
  
            </div>
  
        </div>
    );
  }
}

function registerToken(dispatch) {
  return {
    addToken: function(token) {
      dispatch( {type: 'addToken', currentToken: token});
    }
  }
 }

export default connect(
  null, 
  registerToken
)(ScreenHome);
