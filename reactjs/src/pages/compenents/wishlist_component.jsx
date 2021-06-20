import React, { Component } from 'react';
import axios from 'axios'
import cookie from 'react-cookies'
import {
    Link
  } from "react-router-dom";
import translate from '../i18n/tranlate';

class Product_detail extends Component {
    constructor(props){
        super(props);
        this.cart = this.cart.bind(this);
        this.wishlist_remove = this.wishlist_remove.bind(this);
     
    }
    state = {
        success:'',
    }
    wishlist_remove(){
        let csrf = cookie.load('csrftoken');
        let id = this.props.product.id
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/sasdf5465/',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrf
            },
            data:{'id': id},
            credentials:'include'
        })
        .then(response =>{
            setTimeout(() => {
                this.setState({
                    success:''
                })
            }, 3000);
            this.props.count();
            this.props.mount()
        })
        
    }
    cart(){
        let csrf = cookie.load('csrftoken');
        let id = this.props.product.id
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/sadfasdfgjkljk/',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrf
            },
            data:{'id': id},
            credentials:'include'
        })
        .then(response =>{
            console.log(response)
            if(response.data === 'OK')
            {
                this.setState({
                    success:"Action is done successfully"
                })
                this.props.count();
                setTimeout(() => {
                    this.setState({
                        success:''
                    })
                }, 3000);
            }
            else if(response.data === 'Nol')
            {
                this.setState({
                    success:'Please login in order to carry out this action'
                })
                this.props.count();
                setTimeout(() => {
                    this.setState({
                        success:''
                    })
                }, 3000);
            }
            else if(response.data==='before'){
                this.setState({
                    success:'This product was added to your cart before'
                })
                this.props.count();
                setTimeout(() => {
                    this.setState({
                        success:''
                    })
                }, 3000);
            }
            else{
                this.setState({
                    success:'Action could not be done.Sorry for inconvienence in our website'
                })
                this.props.count();
                setTimeout(() => {
                    this.setState({
                        success:''
                    })
                }, 3000);
            
            }
        })
        
    }
 
    render() { 
        return ( 
                <tr>      
                    <td> 
                        <img src={this.props.product.img} width='30px' height='30px'  /> <Link to={'/product/detail/' + this.props.product.id + '/'}> {this.props.product.name}</Link>
                    </td>
                    <td> 
                        
                            <div onClick={this.cart} className='btn btn-info'>{translate('add_cart')}</div>
                 
                    </td>
                    <td>
                            <div className='btn btn-info' onClick={this.wishlist_remove} >{translate('delete')}</div>
                    </td>
                    {this.state.success !== '' ?   <center>  <div class="alert alert-info alert-dismissible fade show fixed-top">
    <button type="button" class="close" data-dismiss="alert">&times;</button>{this.state.success}</div></center> : ''}
                </tr>    
            );
    }
}
 
export default Product_detail;