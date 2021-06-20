import React, { Component } from 'react';
import axios from 'axios'
import cookie from 'react-cookies'
import {
    Link
  } from "react-router-dom";
import translate from '../i18n/tranlate';
class PostInline extends Component {
   constructor(props){
       super(props)
       this.href = this.href.bind(this)
       this.cart = this.cart.bind(this)
       this.wishlist = this.wishlist.bind(this)
   }
   state = {
       success:''
   }
    sale = () =>{
        if(this.props.post.sale)
        {
            return <div>{this.props.post.price_in_sale} So'm</div>
        }
        else{
            return <div>{this.props.post.price} So'm</div>
        }
    }
    href(){
        return "/product/detail/" + this.props.post.id;
    }
    cart(){
        let csrf = cookie.load('csrftoken');
        let id = this.props.post.id
        console.log(id);
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
                this.props.count()
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
                setTimeout(() => {
                    this.setState({
                        success:''
                    })
                }, 3000);
            }
            else if(response.data === 'before')
            {
                this.setState({
                    success:'This product was added to your cart before'
                })
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
                this.props.count()
                setTimeout(() => {
                    this.setState({
                        success:''
                    })
                }, 3000);
            
            }
        })
        this.props.count()
    }

    wishlist(){
        let csrf = cookie.load('csrftoken');
        let id = this.props.post.id
        axios({
            method:'POST',
            url:'http://127.0.0.1:8000/sdasdfas7575df/',
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
                    success:"Action is done successfully!!"
                })
                this.props.count()
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
                setTimeout(() => {
                    this.setState({
                        success:''
                    })
                }, 3000);
            
            }
        })
        this.props.count();
    }


    render() { 
        console.log(this.props.state)
        return (
 
               
                <div className = 'col-md-4' style={{overflow:'hidden',borderRadius:'15px'}}>
                     {this.state.success !== '' ?   <center>  <div class="alert alert-info alert-dismissible fade show fixed-top">
    <button type="button" class="close" data-dismiss="alert">&times;</button>{this.state.success}</div></center> : ''}
                    <div className="card" style={{width:'100%'}}>
                        <img className="card-img-top" src={'http://127.0.0.1:8000' + this.props.post.img} style={{height:300}} />
                        <div className="card-body">
                        <Link to={this.href}>
                                <h4 className="card-title"  style={{height:'60px',overflow:'hidden',wordBreak:'break-all'}}>{this.props.post.name}</h4>
                        </Link>
                        <p className="card-text"><strong>{this.sale()}</strong></p>
                        <div className="row"> 
                            <div className="col-md-2"></div> 
                                <div onClick={this.cart} className="col-md-2 btn btn-outline-info" style={{borderRadius:'20px',boxShadow:'1px 1px 2px 2px lavender'}}>
                                        <i className="fas fa-cart-plus"></i>
                                </div> 
                            <div className="col-md-1"></div> 
                            <div onClick = {this.wishlist}  className="col-md-2 btn btn-outline-info" style={{borderRadius:'20px',boxShadow:'1px 1px 2px 2px lavender'}} >
                                <i className="fas fa-heart"></i>
                            </div> 
                            <div className="col-md-2"></div> 
                        </div> <br/>
                        <Link to={'/checkout/'+this.props.post.id + '/'} ><button className="btn btn-primary">{translate('buy')}</button></Link>
                        </div>
                    </div><br/>
            
        </div> 
        
        );
    }
}
 
export default PostInline;