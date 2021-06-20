import React, { Component } from 'react';
import axios from 'axios'
import cookie from 'react-cookies'
import Navbar from './Navbar'
import { Redirect } from 'react-router';
import translate from '../i18n/tranlate';
import { I18nProvider, LOCALES } from '../i18n';
import { FormattedMessage} from 'react-intl';
class Contact extends Component {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlefield = this.handlefield.bind(this);
        this.data1 = this.data1.bind(this);
        this.clearform = this.clearform.bind(this);
        this.clearform = this.clearform.bind(this);
        this.lang2 = this.lang2.bind(this)
    }
    state = {
        name : null,
        number:null,
        msg:null,
        success:'',
        errors:null,
        csrfmiddlewaretoken:cookie.load('csrftoken'),
        cart:0,
        wishlist:0,
        success:''
    }
    data1(data){
        let csrf = cookie.load('csrftoken');
        console.log(data)
            return <div style={{color:'red'}}>
                        {this.state.success}
          </div>
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
    empty = () =>{
        setTimeout(() => {
            this.setState({
                success:''
            })
        }, 9000);
    }
    clearform(){
        this.PostCreateForm.reset();
    }
    handleSubmit(event){
        console.log(this.state)
        let comp = this
        let csrf = cookie.load('csrftoken');
        event.preventDefault();
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/contact1/',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrf
            },
            data:this.state,
            credentials:'include'
        })
        .then(response => {
            comp.setState({
                success:response.data
            })
            setTimeout(() => {
               this.setState({
                   success:''
               }) 
            }, 3000);
            
        })
        .catch(errors => {
            comp.setState({
                success:"Something Went Wrong!"
            })
            console.log(errors)
        })
        console.log('Handle Submit');
        this.clearform()
    }
    handlefield(event)
    {
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value,
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
    render() {
            return ( 
            <I18nProvider locale={this.lang1()}>
                 <div>
                     <br/>
                 
                    {this.state.success !== '' ?   <center>  <div class="alert alert-info alert-dismissible fade show fixed-top">
    <button type="button" class="close" data-dismiss="alert">&times;</button>{this.state.success}</div></center> : ''}
                 <form onSubmit={this.handleSubmit} ref = {(el) => this.PostCreateForm = el} className="container">
                 <h2>{translate('contact')}</h2><br/>
                     <label> {translate('name')}</label>
                     <FormattedMessage id="name_contact" defaultMessage="Your Name">
                        {placeholder=>(
                             <input className='form-control' type="text" name="name" id="name" placeholder={placeholder}  onChange={this.handlefield} required = 'required' />
                        )}
                     </FormattedMessage>
                       
                     <br/>
                     <label>{translate('number')}</label>
                     <FormattedMessage id='number_contact' defaultMessage='Sizning telefon nomeringiz(misol:912345678)'>
                         {placeholder2 =>(
                             <input className='form-control' type="number" name="number" placeholder={placeholder2} onChange={this.handlefield} required = 'required' />
                         )}
                         
                     </FormattedMessage>
                        
                     <br/>
                     <label> {translate('message')}</label> <br/>
                          <textarea className='form-control' name="msg" cols="50" rows="10" onChange={this.handlefield} required = 'required'></textarea>
                     <br/>
                          
                     <button type='submit' className='btn btn-info'>{translate('submit')}</button>
                     
                 </form>
             </div>
            </I18nProvider>
                
              );
              
             
      

    }
}
 
export default Contact ;