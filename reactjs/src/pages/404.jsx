import React, { Component } from 'react';
import axios from 'axios'
import Navbar from './compenents/Navbar'
class notfound extends Component {
    constructor(props){
        super(props);
        this.refresh = this.refresh.bind(this);
        this.count = this.count.bind(this);
        this.lang2=this.lang2.bind(this)
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
        lang:'en'
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
    lang2(ev){
        localStorage.setItem('lang',ev);
        this.setState({
            lang:ev
        })
    
      }
    count(){
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
    render() { 
        return (
            <div>
             
                <div style={{position:'relative',paddingTop:'10%'}}>
             
                        <center><h1 className='font-weight-bolder ' style={{fontSize:'100px'}}>404</h1>
                        <p className='font-weight-bolder ' style={{fontSize:'40px'}}>The page that you requested could not be found</p></center>
                  
                </div> 
            </div>
        );
    }
}
 
export default notfound;