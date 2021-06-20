import cookie from 'react-cookies'
import 'whatwg-fetch'
import React, { Component,useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import PostInline from './compenents/post'
import Contact from './compenents/contact'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Navbar from './compenents/Navbar';
import Loading from './compenents/loading';
import axios from 'axios'
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/tranlate';

class List extends Component {
  constructor(props){
    super(props);
    this.lang2 = this.lang2.bind(this);
  }
    state = {
      loading:true,
        posts:[],
        cart:0,
        wishlist:0,
        lang:''
      }
      componentDidMount()
      {
        this.setState({
          posts:[],
        })
        fetch('http://127.0.0.1:8000/api1/')
        .then((response) => response.json())
        .then(booksList => {
          console.log(booksList)
         if(this.state.posts != booksList)
         {
           
          this.setState({ posts: booksList,loading:false});
         }  
        });
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
    render() { 
        if(this.state.loading){
          return <center><h1 style={{paddingTop:'20%'}} >LOADING.......</h1></center>
        }
        else{
          return ( 
           <I18nProvider locale={this.lang1()}>
              <div>
              
                <div className="container">
                    <h3>{translate('list')} </h3><br/>
                    <div className='container'><div className='row'>{this.state.posts.map(post => <PostInline key = {post.id} count={this.props.count} post = {post} /> )}</div></div> 
                </div>
            </div>
           </I18nProvider>
         );
        }
    }
}
 
export default List;