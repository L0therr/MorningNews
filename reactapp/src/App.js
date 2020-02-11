import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//components
import './App.css';
import ScreenHome from './ScreenHome';
import MyArticles from './ScreenMyArticles';
import ArticlesBySource from './ScreenArticlesBySource';
import Source from './ScreenSource';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/my-articles" component={MyArticles} />
          <Route path="/sources" component={Source} />
          <Route path="/articles-by-source/:id" component={ArticlesBySource} />
        </Switch>
    </Router>
  );
}

export default App;
