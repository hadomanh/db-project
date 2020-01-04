import React from 'react';
import './App.css';
import NewsLetter from './Components/NewsLetter';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import Header from './Components/Header';
import Shop from './Components/Shop';
import Product from './Components/Product';
import Login from './Components/LoginForm';
import UploadFiles from './Components/UploadFiles';
import LogOut from './Components/LogOut';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cart from './Components/Cart';
import RegisterForm from './Components/RegisterForm';

function App() {

  return (
    <div className="App">
      <Router>

        <div className="main-content-wrapper d-flex clearfix">
          <Nav />
          <Header />

          <Switch>

            <Route path="/" exact={true}>
              <Shop />
            </Route>


            <Route path="/logout" exact={true}>
              <LogOut />
            </Route>

            <Route path="/register">
              <RegisterForm/>
            </Route>

            <Route path="/detail">
              <Product />
            </Route>

            <Route path="/upload">
              <UploadFiles />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path='/login'>
              <Login/>
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
