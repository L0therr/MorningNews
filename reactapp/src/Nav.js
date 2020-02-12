import React, {useState} from 'react';
import './App.css';
import {Menu, Icon, Input} from 'antd'
import {Link, Redirect} from 'react-router-dom';

function Nav() {

  const [isSearch, setIsSearch] = useState(false);
  const [toSearch, setToSearch] = useState('');

  var startSearch = (val) => {
    if(val.length !== 0){
      setToSearch(val);
      setIsSearch(true);
    }
  }

if(isSearch === true) {
  return (<Redirect to={`/pending/${toSearch}`} />);
} else {
  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        
        <Menu.Item key="mail">
        <Link to="/sources" >
          <Icon type="info-circle" />Sources
        </Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/my-articles" >
            <Icon type="read" />My Articles
          </Link>
        </Menu.Item>
        
        <Menu.Item key="app">
          <Link to="/" >
            <Icon type="logout" />logout
          </Link>
        </Menu.Item>

        <Menu.Item key="search">
        <Input.Search
          placeholder="Search"
          onSearch={value => startSearch(value)}
          style={{ width: 200 }}
        />
        </Menu.Item>
        

      </Menu>
    </nav>
  );
}
}

export default Nav;
