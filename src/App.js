import React from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import NewsLetter from './Components/NewsLetter';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import Header from './Components/Header';
import Shop from './Components/Shop';
import Product from './Components/Product';
import Login from './Components/Login';
import RegisterPage from './Components/RegisterPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cart from './Components/Cart';

function App() {
  
  return (
    <div className="App">
      <Router>
        <SearchBar />

        <div className="main-content-wrapper d-flex clearfix">
          <Nav />
          <Header />

          <Switch>

            <Route path="/home">
              <Shop />
            </Route>

            <Route path="/detail">
              <Product />
            </Route>

            <Route path="/cart">
              <Cart/>
            </Route>

            <Route path='/login'>
              <Login/>
            </Route>


            <Route path='/register'>
              <RegisterPage/>
            </Route>
          </Switch>

        </div>

        <NewsLetter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
