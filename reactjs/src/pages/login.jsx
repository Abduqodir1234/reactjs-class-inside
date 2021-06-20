import React, { Component } from 'react';
import axios from 'axios'
import cookie from 'react-cookies'
import Navbar from './compenents/Navbar'
import { Redirect } from 'react-router';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/tranlate';
import { FormattedMessage } from 'react-intl';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlefield = this.handlefield.bind(this);
        this.clearform = this.clearform.bind(this);
        this.clearform = this.clearform.bind(this);
        this.lang2 = this.lang2.bind(this)
    }
    state = {
        username: null,
        password: undefined,
        success: '',
        login: false,
        lang: ''
    }
    componentDidMount() {

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/check_l/',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include'
        })
            .then(response => {
                this.setState({
                    login: response.data
                })
            })
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
            .then(response => {
                this.setState({
                    cart: response.data.cart,
                    wishlist: response.data.wishlist
                })
            })
    }
    empty = () => {
        setTimeout(() => {
            this.setState({
                success: ''
            })
        }, 15000);
    }
    clearform() {
        this.PostCreateForm.reset();
    }
    handleSubmit(event) {
        event.preventDefault();
        let csrf = cookie.load('csrftoken')
        let comp = this;
        var formData = new FormData()
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/sadfasd/',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf
            },
            data: formData,
            credentials: 'include'
        })
            .then(response => {
                console.log(response)
                if (response.data === 'True') {
                    comp.setState({
                        login: true
                    })
                    this.props.count();
                    this.props.mount()
                }
                else {
                    comp.setState({
                        success: response.data
                    })
                }

            })
            .catch(errors => {
                console.log(errors, "Erzrp")
                comp.setState({
                    success: "Something Went Wrong!"
                })

            })
        this.clearform()
    }
    lang2(ev) {
        localStorage.setItem('lang', ev);
        this.setState({
            lang: ev
        })

    }
    handlefield(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })

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
    render() {
        let csrf = cookie.load('csrftoken');

        if (this.state.login) {
            return <Redirect to='/' />
        }
        else {
            return (

                <div>



                    <I18nProvider locale={this.lang1()} >

                        <form onSubmit={this.handleSubmit} ref={(el) => this.PostCreateForm = el} className="container">
                            <h2>{translate('login')}</h2><br />
                            <div >{this.state.success !== '' ? <div className='alert alert-danger'>{this.state.success}</div> : this.empty()}   </div>
                            <label>{translate('username')}</label>
                            <FormattedMessage id='username' defaultMessage='Sizning foydalanuvchi nomingiz'>
                                {placeholder3 => (
                                    <input className='form-control' placeholder={placeholder3} type="text" name="username" id="" onChange={this.handlefield} required='required' />
                                )}
                            </FormattedMessage>

                            <br />
                            <label>{translate('password')}</label>
                            <FormattedMessage id='password' defaultMessage='Sizning ismingiz'>
                                {placeholder4 => (
                                    <input className='form-control' type="password" placeholder={placeholder4} name="password" onChange={this.handlefield} required='required' />
                                )}
                            </FormattedMessage>

                            <br />
                            <br />

                            <button type='submit' className='btn btn-info'>{translate('submit')}</button>

                        </form>
                    </I18nProvider>
                </div>
            );
        }



    }
}

export default Login;