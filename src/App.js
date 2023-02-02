import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Profile from './pages/UserProfile';
import AppProvider from './context/AppProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoritesRecipes';
import Recipes from './pages/Recipes';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
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
    </AppProvider>
  );
}

export default App;
