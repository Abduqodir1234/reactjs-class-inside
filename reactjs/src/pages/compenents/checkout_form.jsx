import axios from 'axios';
import React, { Component } from 'react';
import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/tranlate';
import Navbar from './Navbar'

class CheckoutForm extends Component {
    constructor(props){
        super(props);
        this.state = this.props.state
        this.handleform = this.handleform.bind(this);
        this.lang2 = this.lang2.bind(this);
    }
    state={
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
    handleform(event){
        event.preventDefault()
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handlesubmit(event){
        event.preventDefault()
        console.log(this)
    }
    render() { 
        return (
            <I18nProvider locale={this.lang1()}>
           
                 <div className='container'>
                <br/>
               <form onSubmit={this.handlesubmit}>
                    <label htmlFor="address">{translate('y_address')}</label>
                    <input type="text" id='address' name='address' placeholder='Address where Product is delivered' className='form-control' />
                    <label htmlFor="tel_num">{translate('number')}</label>
                    <input type="number" className='form-control' id='tel_num' name="tel_num" placeholder='Your telephone number to connect with you' />
                    <br/>
                    <button className="btn btn-info">{translate('submit')}</button>
                    <br/><br/>
               </form>
            </div>
            </I18nProvider>
        );
    }
}
 
export default CheckoutForm;