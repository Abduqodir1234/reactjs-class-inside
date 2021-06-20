
import './App.css';
import cookie from 'react-cookies'
import 'whatwg-fetch'
import React, { Component,useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import PostInline from './pages/compenents/post'
import Contact from './pages/compenents/contact'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import ContactPage from './pages/contact'
import Home from './pages/home'
import List from './pages/list'
import Navbar from './pages/compenents/Navbar';

class App extends Component {
  state={
    cart:0,
    wishlist:0
  }
  render()
  {
    return (
      <React.Fragment>
       
        <Home/>
      </React.Fragment> 
    );
  }
}


export default App;
