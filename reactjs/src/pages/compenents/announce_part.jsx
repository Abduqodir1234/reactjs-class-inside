import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import {
    Link
  } from "react-router-dom";
import axios from 'axios';
import cookie from 'react-cookies'
import translate from '../i18n/tranlate';
import { LOCALES } from '../i18n';

class Announce_post extends Component {

    constructor(props){
        super(props);
        this.href = this.href.bind(this);
        this.href2 = this.href2.bind(this);
        this.delete_btn = this.delete_btn.bind(this)
    }
    href(){
        return "/product/detail/" + this.props.post.id;
    }
    href2(){
        return "/update/" + this.props.post.id;
    }
    delete_btn(){
        let comp = this;
        let id = this.props.post.id;
        let csrf = cookie.load('csrftoken')
        axios({
            method:"POST",
            url:'http://127.0.0.1:8000/asdhjhj/' + id + '/',
            headers:{
                "Content-Type":'application/json',
                'X-CSRFToken':csrf
            },
            credentials:'include'
        })
        .then(response =>{
            console.log(response)
            this.props.mount()
        })
        .catch(errors =>{
            console.log(errors)
            this.props.mount()
        })
    }
    render() { 
        return (  
    <tr>
        <td> <img src={this.props.post.img} width='30px' height='30px'  /> <Link to={'/product/detail/' + this.props.post.id + '/'}> {this.props.post.name}</Link> </td>
        <td><Moment format='YYYY/MM/DD HH:mm'>{this.props.post.date}</Moment></td>
        <td> 
            <Link to={this.href2}>
                <div className='btn btn-info'>{translate('edit')}</div>
            </Link> 
         </td>
        <td>
                <div className='btn btn-info' onClick = {this.delete_btn}>{translate('delete')}</div>
        </td>
        
    </tr>    
        );
    }
}
 
export default Announce_post;