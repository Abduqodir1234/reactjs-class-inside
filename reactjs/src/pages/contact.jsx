import cookie from 'react-cookies'
import 'whatwg-fetch'
import React, { Component,useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import PostInline from './compenents/post'
import Contact from './compenents/contact'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import notfound from './404'
import axios from 'axios'
import Navbar from './compenents/Navbar';
import { I18nProvider,LOCALES } from './i18n';
class ContactPage extends Component {
  constructor(props){
    super(props);
    this.lang2 = this.lang2.bind(this)
  }
    state = {
      cart:0,
      wishlist:0,
      lang:''
    }
    lang1(){
      if(localStorage.getItem('lang') === 'en'){
          
          return LOCALES.English
      }
      else if(localStorage.getItem('lang')=== 'ru'){
          return LOCALES.Russian 
      }
      else if(localStorage.getItem('lang')=== 'uz'){
          return LOCALES.Uzbek
      }
      else{
          console.log("Error")
      }
  }
    contact = () =>{
        let csrf = cookie.load('csrftoken')
          console.log("Exist");
          return (<I18nProvider locale={this.lang1()}><React.Fragment><br/><h3>Contact</h3><Contact /></React.Fragment></I18nProvider>);
        
      }
      componentDidMount(){
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
        .then(response => {
            this.setState({
            cart:response.data.cart,
            wishlist:response.data.wishlist
            })
        })
      }
      lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
      }
    render() { 
        return (
       <I18nProvider locale={this.lang1()}>
          <div>
         
            {this.contact()}
        </div>);
       </I18nProvider>
        )
    }
}
 
export default ContactPage;