
import ContactPage from './contact'
import List from './list'
import cookie from 'react-cookies'
import 'whatwg-fetch'
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PostInline from './compenents/post'
import Contact from './compenents/contact'
import Navbar from './compenents/Navbar'
import Detail from './product detail'
import { BrowserRouter, Route, Redirect, Switch, NavLink, Link } from 'react-router-dom'
import notfound from './404'
import CreateProduct from './compenents/createproduct';
import Login from './login'
import { Spring, useSpring, animated } from 'react-spring'
import Register from './register';
import Announce_post from './compenents/announce_part';
import Announcements from './announcements';
import UpdateProduct from './updateproduct';
import Wishlist from './wishlist';
import axios from 'axios'
import Cart from './cart'
import Profile from './profile';
import ProfileForm from './compenents/profile_form';
import { GoogleApiWrapper } from 'google-maps-react';
import App from './compenents/animation';
import Api from './compenents/map';
import { I18nProvider, LOCALES } from './i18n'
import translate from './i18n/tranlate'
import Form_checkout from './compenents/form-checkout';
import Checkout_form1 from './checkout_1';

function Animation1() {
    const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
    return (
        <animated.div style={props}> <div style={{ width: '300px', wordBreak: 'break-all', padding: '10px', backgroundColor: 'lavender', borderRadius: '10px' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum reprehenderit labore quaerat minus consectetur, optio fugiat dolore, amet ipsam quos libero? Maxime autem veritatis praesentium mollitia! Repudiandae voluptates omnis vitae! </div></animated.div>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.lang1 = this.lang1.bind(this);
        this.lang2 = this.lang2.bind(this);
        this.count = this.count.bind(this);
        this.user = this.user.bind(this)
        this.url2 = this.url2.bind(this)
    }
    state = {
        cart: 0,
        wishlist: 0,
        lang: 'en',
        user: [],
        nothing: ',',
        logout: false,
    }
    lang2(ev) {
        localStorage.setItem('lang', ev);
        this.setState({
            lang: ev
        })

    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
            .then(response => {
                this.setState({
                    cart: response.data.cart,
                    wishlist: response.data.wishlist
                })
            })
        let cpomp = this;
        let csrf = cookie.load('csrftoken')
        axios.get('http://127.0.0.1:8000/logggedin/')
            .then(response => {

                cpomp.setState({
                    user: response.data
                })
            })
            .catch(errors => {
                console.log("Request could not be sent")
            })

    }
    user() {
        let cpomp = this;
        axios.get('http://127.0.0.1:8000/logout1/')
            .then(response => {
                cpomp.setState({
                    user: response.data
                })
            })
            .catch(errors => {
                console.log(errors)
            })
    }


    authenticated = () => {
        if (this.state.user === 'False') {
            return (
                <I18nProvider locale={this.lang1()}>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/login"><div className='nav-link'>{translate('login')}</div></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/signup"><div className='nav-link'>{translate('register')}</div></NavLink>
                        </li>
                    </ul>
                </I18nProvider>

            )
        }
        else {
            return (
                <div className='dropdown' style={{ marginRight: '70px' }}>
                    <button className=" btn btn-light dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user"></i> {this.state.user["username"]}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/profile">My Profile</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={this.user}>Log out</a>
                    </div>
                </div>)
        }
    }
    url = () => {
        if (this.state.user !== 'False') {
            return "/create/product/";
        }
        else {
            return "/login/";
        }
    }
    url2() {
        if (this.state.user !== 'False') {
            return "/announcement";
        }
        else {
            return "/login/";
        }
    }
    lang1() {
        if (localStorage.getItem('lang') === 'en') {

            return LOCALES.English
        }
        else if (localStorage.getItem('lang') === 'ru') {
            return LOCALES.Russian
        }
        else if (localStorage.getItem('lang') === 'uz') {
            return LOCALES.Uzbek
        }
        else {
            return LOCALES.Uzbek
        }
    }






    count() {
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
            .then(response => {
                this.setState({
                    cart: response.data.cart,
                    wishlist: response.data.wishlist,
                    isloading: true,
                    nothing: "sdfmasd,fmnads"
                })
            })
        let cpomp = this;
        let csrf = cookie.load('csrftoken')
        axios.get('http://127.0.0.1:8000/logggedin/')
            .then(response => {

                cpomp.setState({
                    user: response.data
                })
            })
            .catch(errors => {
                console.log("Request could not be sent")
            })
    }
    render() {
        console.log(this.state.lang)
        return (

            <BrowserRouter>
                <Navbar lang2={this.lang2} state={this.state} user={this.user} authenticated={this.authenticated} url={this.url} url2={this.url2} lang1={this.lang1} count={this.count} /> <br />
                <Switch>
                    <Route exact path="/"> <I18nProvider locale={this.lang1()}>
                        {translate("hello")}<br /> {translate('greeting', { path: <strong>Abduqodir</strong> })}
                    </I18nProvider>  </Route>
                    <Route exact path="/product_list" > <List count={this.count} /> </Route>
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/product/detail/:slug" component={Detail} />
                    <Route exact path="/notfound" component={notfound} />
                    <Route exact path='/create/product'  > <CreateProduct state={this.state} /> </Route>
                    <Route exact path='/login' > <Login count={this.count} /> </Route>
                    <Route exact path='/signup' component={Register} />
                    <Route exact path='/announcement' component={Announcements} > <Announcements state={this.state} /> </Route>
                    <Route exact path='/update/:id' > <UpdateProduct state={this.state} />  </Route>
                    <Route exact path='/wishlist/' > <Wishlist count={this.count} state={this.state} /> </Route>
                    <Route exact path='/cart/'  ><Cart count={this.count} state={this.state} /></Route>
                    <Route exact path='/profile'  > <Profile state={this.state} />  </Route>
                    <Route exact path='/edit/' > <ProfileForm state={this.state} />  </Route>
                    <Route exact path='/map/' component={Api} />
                    <Route exact path='/animation/' component={App} />
                    <Route exact path='/checkout/' c > <Form_checkout state={this.state} /> </Route>
                    <Route exact path='/checkout/:id' component={Checkout_form1} />
                    <Route path="*" component={notfound} />

                </Switch>

            </BrowserRouter>
        );
    }
}

export default Home;