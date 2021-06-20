import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './compenents/loading';
import Navbar from './compenents/Navbar';
import Product_detail from './compenents/wishlist_component';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/tranlate';

class Wishlist extends Component {
    constructor(props){
        super(props);
        this.refresh = this.refresh.bind(this);
        this.lang2 = this.lang2.bind(this)
    }
    state = {
        posts:[],
        success:'',
        cart:0,
        wishlist:0,
        isloading:false,
        lang:''
    }
    lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
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
    refresh(){
        axios.get('http://127.0.0.1:8000/sadfasfwr234/')
        .then(response =>{
            console.log(response.data,"Response")
           this.setState({
               posts:response.data
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
        if(this.props.state.user === "False"){
            return <Redirect to="/" />
        }
        else{
            if(this.state.isloading){
                return (
                   <I18nProvider locale={this.lang1()}>
                        <div>
           
                        <br/>
        
                        <div className='container'>
                        <h1>{translate('wishlist')}</h1>
                        <br/>
                        <br/>
                       {this.state.posts.length > 0 ?
                        <React.Fragment>
                             <table class="table table-hover">
                            <tbody>
                            <tr>
                                <td>{translate('p_name')}</td>
                                <td>{translate('p_name')}</td>
                                <td>{translate('delete')}</td>
                            </tr>
                            {this.state.posts.map(product => <Product_detail key = {product.id} count = {this.props.count} product = {product} state = {this.state} mount = {this.refresh} />)}
                            </tbody>
                        </table>
                       </React.Fragment> :  <center className='alert alert-danger'><h1>{translate('empty_wishlist')}</h1></center> }
                      
                        </div>
                    </div>
                   </I18nProvider>
                );
               }
               else{
                   return (
                    <Loading />
                   );
               }
        
        }
           }
}
 
export default Wishlist;