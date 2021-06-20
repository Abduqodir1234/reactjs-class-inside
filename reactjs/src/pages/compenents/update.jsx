import cookie from 'react-cookies'
import 'whatwg-fetch'
import React, { Component,useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import PostInline from './compenents/post'
import Contact from './compenents/contact'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Navbar from './compenents/Navbar';

class Update extends Component {
    state = {
        posts:[],
      }
      componentDidMount()
      {
        this.setState({
          posts:[],
        })
        fetch('/api1/')
        .then((response) => response.json())
        .then(booksList => {
         if(this.state.posts != booksList)
         {
          this.setState({ posts: booksList });
         }  
        });
      }
componentDidUpdate(){
  setTimeout(() => {
    fetch('/api1/')
    .then((response) => response.json())
    .then(booksList => {
      console.log(booksList);
        this.setState({ posts: booksList });
    });
  }, 1000);
}
    render() { 
        return ( 
            <div>
        
                <div className="container">
                    <h3>Your Announcements </h3><br/>
                    <div className='container'><div className='row'>{this.state.posts.map(post => <PostInline key = {post.id} post = {post} /> )}</div></div> 
                </div>
            </div>
         );
    }
}
 
export default Update;