import React, {useState, useEffect} from 'react';
import './App.css';
import {Input,Button} from 'antd';

function ScreenHome() {

  //login
  //signin
  const [signName, setSignName] = useState('');
  const [signMail, setSignMail] = useState('');
  const [signPswd, setSignPswd] = useState('');


  //check if user exist
  useEffect(() => {
    var fetchData = async () => {
      var rawResponse = await fetch('/');
      console.log(rawResponse)
    }
    fetchData();
  }, []);

  var handleSign = async (name, mail, pswd) => {
    await fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `username=${name}&email=${mail}&pswd=${pswd}`
});
  }

  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                  
                  <Input className="Login-input" placeholder="arthur@lacapsule.com" />

                  <Input.Password className="Login-input" placeholder="Password" />
            
            <Button href="" style={{width:'80px'}} type="primary">Sign-in</Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">

          <Input className="Login-input" placeholder="Username"
            onChange={(e) => setSignName(e.target.value)}
            value={signName}
          />

          <Input className="Login-input" placeholder="Email"
            onChange={(e) => setSignMail(e.target.value)}
            value={signMail}
          />

          <Input.Password className="Login-input" placeholder="Password"
            onChange={(e) => setSignPswd(e.target.value)}
            value={signPswd}
          />
          
          <Button href="" style={{width:'80px'}} type="primary"
            onClick={() => handleSign(signName, signMail, signPswd)}
          >Sign-up</Button>

          </div>

      </div>
  );
}

export default ScreenHome;
