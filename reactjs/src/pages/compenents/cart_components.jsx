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
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
        this.wishlist_remove = this.wishlist_remove.bind(this);
        this.remove = this.remove.bind(this)
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
    plus(){
        let csrf = cookie.load('csrftoken');
        let id = this.props.product.id
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/12344t6789dfgdfg/',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrf
            },
            data:{'id': id},
            credentials:'include'
        })
        .then(response =>{
           this.setState({
               success:response.data
           })
           setTimeout(() => {
               this.setState({
                   success:''
               })
           }, 3000);
           this.props.mount()
        })
        
    }
    minus(){
        let csrf = cookie.load('csrftoken');
        let id = this.props.product.id
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/asdfasdf12312awdf12312/',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrf
            },
            data:{'id': id},
            credentials:'include'
        })
        .then(response =>{
           this.setState({
               success:response.data
           })
           setTimeout(() => {
            this.setState({
                success:''
            })
        }, 3000);
           this.props.mount()
        })
        
    }

    remove(){
        let csrf = cookie.load('csrftoken');
        let id = this.props.product.id
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/asdfmnask32ui42398lk/',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrf
            },
            data:{'id': id},
            credentials:'include'
        })
        .then(response =>{
           this.setState({
               success:response.data
           })
           this.props.mount()
           setTimeout(() => {
            this.setState({
                success:''
            })
        }, 3000);
           this.props.mount()
           this.props.count()
        })
        
    }
    render() { 
        return ( 
                <tr>      
                    <td> 
                        <img src={this.props.product.image} width='30px' height='30px'  /> {this.props.product.name}
                    </td>
                    <td> 
                        <div > <button type="button" onClick={this.minus} className='btn btn-danger'>-</button> {this.props.product.quantity} <div onClick={this.plus} className="btn btn-info">+</div> </div>
                    </td>
                    <td>
                        <div className='btn btn-info' > {this.props.product.quantity * this.props.product.price} {translate('som')} </div>
                    </td>
                    <td>
                        <div className='btn btn-info' onClick={this.remove} > {translate('delete')} </div>
                    </td>
                    {this.state.success !== '' ?   <center>  <div class="alert alert-info alert-dismissible fade show fixed-top">
    <button type="button" class="close" data-dismiss="alert">&times;</button>{this.state.success}</div></center> : ''}
                </tr>    
            );
    }
}
 
export default Product_detail;