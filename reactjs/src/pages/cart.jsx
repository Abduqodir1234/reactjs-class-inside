import axios from 'axios';
import cookie from 'react-cookies'
import React, { Component } from 'react';
import Navbar from './compenents/Navbar';
import Product_detail from './compenents/cart_components';
import Loading from './compenents/loading';
import CheckoutForm from './compenents/checkout_form';
import {Spring} from 'react-spring'
import { Link, Redirect } from 'react-router-dom';
import translate from './i18n/tranlate';
import { I18nProvider,LOCALES } from './i18n';

class Cart extends Component {
    constructor(props){
        super(props);
        this.refresh = this.refresh.bind(this);
        this.ch = this.ch.bind(this);
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
        lang:''
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/32234jnk234324/')
        .then(response =>{
            console.log(response.data,"Response")
           this.setState({
               posts:response.data,

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
    
    refresh(){
        axios.get('http://127.0.0.1:8000/32234jnk234324/')
        .then(response =>{
            console.log(response.data,"Response")
           this.setState({
               posts:response.data
           })
        })
    }
    lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
      }
    ch(){
        this.setState({checkout:!this.state.checkout})
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
        if(this.props.state.user === "False"){
            return <Redirect to="/" />
        }
        else{
            console.log(this.state.checkout)
        if(this.state.isloading)
        {
            return (
               <I18nProvider locale={this.lang1()}>
                         <div>
     
                    <br/>
    
                    <div className='container'>
                    <h1>{translate('cart')}</h1>
                    <br/>
                    <br/>
                    {this.state.success !== '' ?   <center>  <div class="alert alert-info alert-dismissible fade show fixed-top">
    <button type="button" class="close" data-dismiss="alert">&times;</button>{this.state.success}</div></center> : ''}
                   {
                    this.state.posts.length > 0 ?
                        <React.Fragment>
                        <div className='table-responsive'>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <td>{translate('p_name')}</td>
                                    <td>{translate('quantity')}</td>
                                    <td>{translate('t_price')}</td>
                                    <td>{translate('action')}</td>
                                </tr>
                                {this.state.posts.map(product => <Product_detail key = {product.id} count = {this.props.count} product = {product} state = {this.state} mount = {this.refresh} />)}
                            </tbody>
                        </table>
                        </div>
                    </React.Fragment>:  <center className='alert alert-danger'><h1>{translate('empty')}</h1></center>
                   }
                  {this.state.posts.length !== 0 ?  <Link to='/checkout/' > <button className="btn btn-info">{translate('checkout')}</button> </Link> : <button disabled className='btn btn-info'>Checkout</button>}
                  
                    </div>

                </div>
               </I18nProvider>
            );
        }
        else{
            return (<Loading />);
        }
        }
    }
}
 
export default Cart;