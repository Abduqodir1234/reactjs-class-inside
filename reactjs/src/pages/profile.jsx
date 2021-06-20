import axios from 'axios';
import React, { Component } from 'react';
import {
    Link, Redirect
  } from "react-router-dom";
import Navbar from './compenents/Navbar';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/tranlate';
class Profile extends Component {
    constructor(props){
        super(props);
        this.lang2 = this.lang2.bind(this);
    }
    state = {
        post:[],
        success:'',
        wishlist:0,
        cart:0,
        lang:''
    }
    lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
      }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/rtqkaq2345akdker24/')
        .then(response =>{
            console.log(response)
            this.setState({
                post:response.data
            })
        })
        .catch(errors =>{
            this.setState({
                success:'Something went wrong!!'
            })
        })
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
        .then(response => {
            this.setState({
            cart:response.data.cart,
            wishlist:response.data.wishlist
            })
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
        console.log(this.state.post)
        if(this.props.state.user === "False"){
            return <Redirect to="/" />
            
        }
        else{
            return ( 
                <I18nProvider locale={this.lang1()}>
                  <div>
   
                      <div className='container'>
                      <h1>{translate('my_profile')}</h1><br/><br/>
                         <h3>{translate('name')}:{this.state.post.first_name}</h3><br/>
                         <h3>{translate('surname')}: {this.state.post.last_name}</h3><br/>
                         <h3>{translate('username')}: {this.state.post.username}</h3><br/>
                         <h3>{translate('email')}:{this.state.post.email}</h3><br/>
                         <Link to="/edit/"><div className="btn btn-lg btn-info">{translate('edit')}</div></Link>
                  </div>
                 </div>
                </I18nProvider>
                  );
        }
    }
}
 
export default Profile;