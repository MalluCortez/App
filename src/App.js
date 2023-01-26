import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />   
        <Route exact path="/meals/:id-da-receita" component={ Login } />
        <Route exact path="/drinks/:id-da-receita" component={ Login } />
        <Route exact path="/meals/:id-da-receita/in-progress" component={ Login } />
        <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
