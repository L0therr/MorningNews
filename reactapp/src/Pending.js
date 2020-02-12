import React from 'react';
import {Redirect} from 'react-router-dom';

import './App.css';

function App(props) {
  return (
    <Redirect to={`/search/${props.match.params.toSearch}`} />
  );
}

export default App;
