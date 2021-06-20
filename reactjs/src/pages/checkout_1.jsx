import React, { Component } from 'react';
import cookie from 'react-cookies'
import axios from 'axios'
import { Redirect } from 'react-router';
import { I18nProvider, LOCALES } from './i18n';


import Navbar from './compenents/Navbar';
import translate from './i18n/tranlate';
class Checkout_form1 extends Component {
    
    constructor(props){
        
        super(props);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.handleform = this.handleform.bind(this);
        this.lang2 = this.lang2.bind(this)
    }
    state = {
        posts:[],
        success:'',
        cart:0,
        wishlist:0,
        isloading:false,
        checkout:false,
        address:null,
        tel_num:null,
        name:null,
        surname:null,
        disabled:false,
        link:false,
        wishlist:0,
        cart:0,
        lang:'',
        qunatity:0,

    }
    handlesubmit(event){
        event.preventDefault();
        console.log('Working')
        var formData = new FormData()
        let csrf = cookie.load('csrftoken')
        formData.append('address',this.state.address);
        formData.append('tel_num',this.state.tel_num);
        formData.append('name',this.state.name);
        formData.append('surname',this.state.surname);
        formData.append('id',this.props.match.params.id);
        formData.append('quantity',this.state.qunatity)
        this.setState({
            disabled:true
        })
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/check1/',
            headers:{
                'content-type':'application/json',
                'X-CSRFToken': csrf
            },
            data:formData,
            credentials:'include'
            
        })
        .then(response =>{
            
            console.log(response)
            this.setState({
                success:"You booked successfully!!",
                disabled:false,
                link:true
            })
            setTimeout(() => {
                this.setState({
                    success:""
                })
            }, 3000);
        })
        .catch(errors =>{
            console.log(errors)
            this.setState({
                success:"Something went wrong!",
                disabled:false
            })
            setTimeout(() => {
                this.setState({
                    success:""
                })
            }, 3000);
        })
        console.log(this)
    }
    handleform(event){
        event.preventDefault()
        this.setState({
            [event.target.name]:event.target.value
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
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/sadfasfwr234/')
        .then(response =>{
            console.log(response.data,"Response")
           this.setState({
               posts:response.data
           })
        })
    axios.get('http://127.0.0.1:8000/sdlkewrws/')
    .then(response => {
      this.setState({
        cart:response.data.cart,
        wishlist:response.data.wishlist,
        isloading:true
      })
    })
    }
    render() { 
        if(this.state.link){
            return <Redirect to='/product_list'/>
        }
        else{
            return (
               <I18nProvider locale={this.lang1()}>
        
                         <div className='container' >
                    <h1>{translate('checkout')}</h1>
                    {this.state.success !== '' ?   <center>  <div class="alert alert-info alert-dismissible fade show fixed-top">
                      <button type="button" class="close" data-dismiss="alert">&times;</button>{this.state.success}</div></center> : ''}
                    <form onSubmit={this.handlesubmit}>
        
                        <label htmlFor="name">{translate('name')}</label>
                        <input type="text"  id='name' name='name'  className='form-control' onChange = {this.handleform} required="required" />
                        <label htmlFor="surname">{translate('surname')}</label>
                        <input type="text"  id='surname' name='surname'  className='form-control' onChange = {this.handleform} required="required" />
                        <label htmlFor="address">{translate('address')}</label>
                        <input type="text" required='required' id='address' name='address'  className='form-control' required="required" onChange = {this.handleform} />
                        <label htmlFor="tel_num">{translate('number')}</label>
                        <input type="number" required='required' className='form-control' id='tel_num' name="tel_num" required="required" onChange = {this.handleform} />
                        <label htmlFor="tel_num">{translate('quantity')}</label>
                        <input type="number" required='required' className='form-control' id='tel_num' name="qunatity" required="required" onChange = {this.handleform} />
                        <br/>
                        {this.state.disabled ? <button type='submit' disabled='disabled'  className="btn btn-info">{translate('submit')}</button> : <button type='submit' className="btn btn-info">{translate('submit')}</button>} 
                        <br/><br/>
                    </form>
        
                </div>
               </I18nProvider>
                );
        }
    }
}
 
export default Checkout_form1;