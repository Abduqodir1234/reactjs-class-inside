import axios from 'axios';
import cookie from 'react-cookies'
import React, { Component } from 'react';
import {
    Link,
    Redirect
  } from "react-router-dom";
import Navbar from './Navbar'
import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/tranlate';
class ProfileForm extends Component {
    constructor(props){
        super(props);
        this.handlefield = this.handlefield.bind(this);
        this.lang2 = this.lang2.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    state = {
        username:null,
        username_error:'',
        first_name:null,
        first_name_error:'',
        last_name:null,
        last_name_error:'',
        email:null,
        email:'',
        wishlist:0,
        cart:0,
        ok:false  
      }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/rtqkaq2345akdker24/')
        .then(response =>{
            this.setState({
                username:response.data.username,
                first_name:response.data.first_name,
                last_name:response.data.last_name,
                email:response.data.email
            })
        })
        .catch(errors =>{
            console.log(errors)
        })
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
        .then(response => {
            this.setState({
            cart:response.data.cart,
            wishlist:response.data.wishlist
            })
        })
    }
    handlefield(event){
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
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
    lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
      }
    handlesubmit(event){
        event.preventDefault();
        console.log("ok")
        let csrf = cookie.load('csrftoken')
        var formData = new FormData()
        formData.append('first_name',this.state.first_name);
        formData.append('last_name',this.state.last_name);
        formData.append('email',this.state.email);
        formData.append('username',this.state.username);
        console.log('Coming')
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/rtqkaq2345akdker24/',
            headers:{
                'content-type':'application/json',
                'X-CSRFToken':csrf
            },
            data:formData,
            credentials:'include'
        })
        .then(response =>{
            this.setState({
                ok:true
            })
        })
        .catch(errors =>{
            console.log(errors)
            if(errors.data.username)
            {
                this.setState({
                    username_error:errors.data.username
                })
            }
            else if(errors.data.last_name){
                this.setState({
                    last_name_error:errors.data.last_name_error
                })
            }
            else if(errors.data.email){
                this.setState({
                    email_error:errors.data.email_error
                })
            }
            else if(errors.data.first_name){
                this.setState({
                    first_name_error:errors.data.first_name_error
                })
            }
        })
    }
    render() { 
       if(this.props.state.user === "False"){
        return <Redirect to="/" />
       }
       else{
        if(this.state.ok)
        {
            return <Redirect to="/profile/" />
        }
        else{
         return ( 
             <I18nProvider locale={this.lang1()}>
                      <div>
          
                  <div className="container">
                      
                  <h1>{translate('e_y_profile')}</h1><br/><br/>
                  <form  onSubmit={this.handlesubmit}>
                      <label htmlFor="name">{translate('name')}</label>
                      <input type="text" className="form-control" name="first_name" id="name" defaultValue={this.state.first_name} onChange = {this.handlefield} />
                      {this.state.username_error !== '' ? <div style={{color:'red'}}>{this.state.username_error}</div> : ''}
                      <label htmlFor="surname">{translate('surname')}</label>
                      <input type="text" className="form-control" name="last_name" id="surname" defaultValue={this.state.last_name} onChange={this.handlefield}  />
                      {this.state.last_name !== '' ? <div style={{color:'red'}}>{this.state.last_name_error}</div> : ''}
                      <label htmlFor="username">{translate('username')}</label>
                      <input type="text" className="form-control" name="username" id="username" defaultValue={this.state.username} onChange={this.handlefield} />
                      {this.state.username_error !== '' ? <div style={{color:'red'}}>{this.state.username_error}</div> :''}
                      <label htmlFor="email">{translate('email')}</label>
                      <input type="email" className="form-control" name="email" id="email" defaultValue={this.state.email} onChange={this.handlefield} />
                      {this.state.email_error !== '' ? <div style={{color:'red'}}>{this.state.email_error}</div>:''}
                      <button type='submit' className="btn btn-info">{translate('submit')}</button>
                  </form>
              </div>
             </div>
             </I18nProvider>
           );
        }
       }
    }
}
 
export default ProfileForm;