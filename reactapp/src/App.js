import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//components
import './App.css';
import ScreenHome from './ScreenHome';
import MyArticles from './ScreenMyArticles';
import ArticlesBySource from './ScreenArticlesBySource';
import Source from './ScreenSource';
import Search from './Search';
import Pending from './Pending';

//REDUX
import wishList from './reducers/article';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({wishList}));

//APP
function App() {
  return (
    <Provider store={store}>
      <Router>
          <Switch>
            <Route path="/" exact component={ScreenHome} />
            <Route path="/my-articles" component={MyArticles} />
            <Route path="/sources" component={Source} />
            <Route path="/search/:word" component={Search} />
            <Route path="/articles-by-source/:id" component={ArticlesBySource} />
            <Route path='/pending/:toSearch' component={Pending}></Route>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
