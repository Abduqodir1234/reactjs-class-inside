import React, { Component } from 'react';
import Navbar from './compenents/Navbar'
import axios from 'axios'
import Detail1 from './compenents/detail1'
import {Redirect} from 'react-router-dom'
import { I18nProvider, LOCALES } from './i18n';
import Loading from './compenents/loading';

class Detail extends Component {
    constructor(props){
        super(props);
        this.lang2=this.lang2.bind(this)
    }
    state = {
        slug:null,
        valid:true,
        array:[],
        cart:0,
        wishlist:0,
        lang:'',
        isloading:true
    }
    lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
      }
    componentDidMount()
    {   
        let comp = this;
        if(comp.props.match)
        {
           const slug = comp.props.match.params.slug
           comp.setState({
               slug:slug
           })
           let url = "http://127.0.0.1:8000/detail/" + slug;
           axios.get(url)
            .then(response=>{
         
                comp.setState({  
                    array:response.data,
                    isloading:false
                })
            })
            .catch(errors =>{
     
           
                comp.setState({
                    valid:false
                });
            })
        }
       
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
        .then(response => {
          this.setState({
            cart:response.data.cart,
            wishlist:response.data.wishlist
          })
        })
    }
    

    
    valid = () => {
       
        if(this.state.valid){
            if(!this.state.isloading)
            {
                return <Detail1 pro={this.state.array}/>;
            }
            else{
                return <Loading />
            }
            
        }
        else if (this.state.valid !== true){
            return <Redirect to='/notfound' />;
        }
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
       
    }
    render() {
        return (
        <I18nProvider locale={this.lang1()}>
            <div>
      
            {this.valid()}
        </div>
        </I18nProvider>
        );
    }
}
 
export default Detail;