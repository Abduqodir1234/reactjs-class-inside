import React, { Component } from 'react';
import axios from 'axios'
import cookie from 'react-cookies'
import Navbar from './compenents/Navbar'
import { Redirect } from 'react-router';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/tranlate';
import { FormattedMessage } from 'react-intl';
class Register extends Component {

    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlefield = this.handlefield.bind(this);
        this.data1 = this.data1.bind(this);
        this.clearform = this.clearform.bind(this);
        this.lang2 = this.lang2.bind(this)
    }

    state = {
        username : null,
        username_errror:'',
        email:null,
        email_error:'',
        password1:null,
        password1_error:'',
        password2:null,
        password2_error:'',
        success:'',
        valid:false,
        cart:0,
        wishlist:0,
        lang:''
    }
    lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
      }
    data1(data){
        let csrf = cookie.load('csrftoken');
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
        event.preventDefault();
        let comp = this;
        var formData = new FormData()
        formData.append('username',this.state.username);
        formData.append('email',this.state.email);
        formData.append('password1',this.state.password1);
        formData.append('password2',this.state.password2);
        let csrf = cookie.load('csrftoken');
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/register/',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrf
            },
            data:formData,
            credentials:'include'
        })
        .then(response => {
                if(response.data === 'True'){
                    comp.setState({
                        valid:true,
                        success:'New Account is created succesfully'
                    })
                }
                else if(response.data.username){
                    console.log('Username')
                    comp.setState({
                        username_errror:response.data.username
                    })
                }
                else if(response.data.email){
                    comp.setState({
                        email_error:response.data.email
                    })
                }
                else if(response.data.password1){
                    comp.setState({
                        password1_error:response.data.password1
                    })
                }
                else if(response.data.password2){
                    comp.setState({
                        password2_error:response.data.password2
                    })
                }

        })
        this.clearform()
        setTimeout(() => {
            comp.setState({
                username_errror:'',
                email_error:'',
                password1_error:'',
                password2_error:''
            })
        }, 5000);
    }
    handlefield(event)
    {
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value,
        })
        
    }
    count(){
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
            return LOCALES.Uzbek
        }
    }
    render() {
        let csrf = cookie.load('csrftoken');
        console.log(this.state.success,"Salom")
     
               if(this.state.valid)
               {
                return <Redirect to='/login'/>
               }
               else{
                return ( 
            
                    <div>
                     
                     <I18nProvider locale={this.lang1()}>

                        <form onSubmit={this.handleSubmit} ref = {(el) => this.PostCreateForm = el} className="container">
                        <h2>{translate('register')}</h2><br/>
                    
                            <label> {translate('username')}</label>
                            <FormattedMessage id='username' defaultMessage='Sizning foydalanuvchi nomingiz'>
                             {placeholder3 =>(
                                 <input className='form-control' placeholder={placeholder3}  type="text" name="username" id="" placeholder={placeholder3} onChange={this.handlefield} required = 'required' />
                        
                             )}
                         </FormattedMessage>
                               
                            {this.state.username_errror !== '' ?   <label className='alert alert-danger' style={{color:'red',width:'100%'}}>{this.state.username_errror}</label> : ''}
                            <br/>
                            <label htmlFor="email">{translate('email')}</label>
                               <FormattedMessage id='email' >
                                   {placeholder =>
                                        <input type="email" name="email" className='form-control' placeholder={placeholder} onChange={this.handlefield} required='required' />
                                   }
                               </FormattedMessage>
                            {this.state.email_error !== '' ?  <label className='alert alert-danger' style={{color:'red',width:'100%'}}>{this.state.email_error}</label> :''}<br/>
                            <label>{translate('password')}</label>
                            <FormattedMessage id='password' defaultMessage='Sizning parolingiz'>
                             {placeholder2 =>(
                                 <input className='form-control' type="password" name="password1" placeholder={placeholder2} onChange={this.handlefield} required = 'required' />
                             )}
                         </FormattedMessage>
                               
                                {this.state.password1_error !== '' ? <label className='alert alert-danger' style={{color:'red',width:'100%'}}>{this.state.password1_error}</label> :''}
                            <label>{translate('confirm_pass')}</label>
                            <FormattedMessage id='confirm_pass' defaultMessage=' Tasdiqlash paroli'>
                             {placeholder5 =>(
                                  <input className='form-control' type="password" name="password2" placeholder={placeholder5} onChange={this.handlefield} required = 'required' />
                             )}
                         </FormattedMessage>
                                  
                                    {this.state.password2_error !== '' ? <label className='alert alert-danger' style={{color:'red',width:'100%'}}>{this.state.password2_error}</label> :''}<br/>
                            <br/>
                                <br/>
                            <button type='submit' className='btn btn-info'>{translate('submit')}</button>
                            
                        </form>
                     </I18nProvider>
                 </div> 
                  );
               }
             
      

    }
}
 
export default Register ;