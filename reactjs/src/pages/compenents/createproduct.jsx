import axios from 'axios';
import React, { Component } from 'react';
import cookie from 'react-cookies'
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';
import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/tranlate';
import Navbar from './Navbar';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            color: null,
            desc: null,
            price: null,
            sale: false,
            price_in_sale: 2,
            quantity: null,
            img: undefined,
            size: null,
            category: 'Men & Women  Clothes',
            brand: null,
            csrfmiddlewaretoken: cookie.load('csrftoken'),
            success: '',
            user: '',
            cart: 0,
            wishlist: 0
        }
        this.handleForm = this.handleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileForm = this.handleFileForm.bind(this);
        this.price = this.price.bind(this);
        this.clear = this.clear.bind(this);
        this.lang2 = this.lang2.bind(this);
    }
    handleForm(event) {
        let comp = this;
        console.log(event.target.name, event.target.value)
        if (event.target.name === 'sale') {
            if (event.target.checked === true) {
                comp.setState({
                    sale: true
                })
                console.log("Sale:False")
            }
            else {
                comp.setState({
                    sale: false
                })
                console.log("Sale:True")
            }
        }
        else {
            this.setState({
                [event.target.name]: event.target.value,
            })
            console.log('not checkbox')
        }


    }
    price() {
        if (this.state.sale) {
            return (<I18nProvider locale={this.lang1()}>
                <label htmlFor="price">{translate('p_i_s')}</label>
                <input type="number" name="price_in_sale" className='form-control' onChange={this.handleForm} />
            </I18nProvider>)
        }
    }

    handleSubmit(event) {
        let csrf = cookie.load('csrftoken');
        var formData = new FormData();
        formData.append('img', this.state.img)
        formData.append('name', this.state.name)
        formData.append('color', this.state.color)
        formData.append('desc', this.state.desc)
        formData.append('price', this.state.price)
        formData.append('price_in_sale', this.state.price_in_sale)
        formData.append('sale', this.state.sale)
        formData.append('quantity', this.state.quantity)
        formData.append('img', this.state.img)
        formData.append('size', this.state.size)
        formData.append('sale', this.state.sale)
        formData.append('category', this.state.category)
        formData.append('brand', this.state.brand)
        formData.append('user', '')
        event.preventDefault();
        console.log(this.state)
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api1/',
            headers: {
                "Content-Type": "multipart/form-data",
                'X-CSRFToken': csrf
            },
            data: formData,
            credentials: 'include'
        })
            .then(response => {
                console.log(response)
                // this.setState({
                //     success:"New announcement created successfully"
                // })
            })
            .catch(errors => {

                this.setState({
                    success: "Something went wrong"
                })
            })
        this.clear()
        setTimeout(() => {
            this.setState({
                success: ''
            })
        }, 5000);
    }
    clear() {
        this.ppp.reset();
    }
    handleFileForm(event) {
        event.preventDefault();
        let files = event.target.files;
        this.setState({
            img: files[0]
        }, () => console.log(this.state));
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
            .then(response => {
                this.setState({
                    cart: response.data.cart,
                    wishlist: response.data.wishlist
                })
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
            console.log("Error")
        }
    }

    lang2(ev) {
        localStorage.setItem('lang', ev);
        this.setState({
            lang: ev
        })

    }
    render() {
        if (this.props.state.user === "False") {
            return <Redirect to="/" />
        }
        else {
            return (
                <I18nProvider locale={this.lang1()}>
                    <div className='container'>
                        <form onSubmit={this.handleSubmit} className='container' ref={(el) => this.ppp = el} encType="multipart/form-data">
                            {this.state.success !== '' ? <center>  <div class="alert alert-info alert-dismissible fade show fixed-top">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>{this.state.success}</div></center> : ''}
                            <label htmlFor='name'>{translate('p_name')}</label>
                            <input type="text" id='name' name="name" className='form-control' onChange={this.handleForm} required='required' />
                            <label htmlFor="quantity">{translate('quantity')}</label>
                            <input type="number" id='quantity' className='form-control' name="quantity" required='required' onChange={this.handleForm} />
                            <label htmlFor="price">{translate('price')}</label>
                            <input type="number" required='required' id='price' name="price" className='form-control' onChange={this.handleForm} />
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck" name="sale" checked={this.state.sale} onChange={this.handleForm} />
                                <label className="custom-control-label" htmlFor="customCheck"> {translate('sale')}</label>
                            </div>
                            {this.price()}
                            <label htmlFor="img">{translate('main_image')} </label>
                            <input type="file" name='img' required='required' accept='.jpg,.png,.svg' onChange={this.handleFileForm} /><br />
                            <label htmlFor="size">{translate('size')}</label>
                            <input type="text" name="size" required='required' className='form-control' onChange={this.handleForm} />
                            <label htmlFor="color">{translate('a_color')}</label>
                            <input type="text" name="color" required='required' className='form-control' onChange={this.handleForm} />
                            <label htmlFor="desc">{translate('desc')}</label>
                            <textarea cols="30" rows="10" required='required' name="desc" className='form-control' onChange={this.handleForm}></textarea>
                            <label htmlFor="category">{translate('category')}</label>
                            <select name="category" class="custom-select mb-3" required='required' onChange={this.handleForm}>
                                <FormattedMessage id='c_1' defaultMessage='Fashion & Beauty'>
                                    {value1 => (
                                        <option value="Fashion & Beauty">{value1}</option>
                                    )}
                                </FormattedMessage>
                                <FormattedMessage id='c_2' defaultMessage='Kids & Babies Clothes'>
                                    {value2 => (
                                        <option value="Kids & Babies Clothes">{value2}</option>
                                    )}
                                </FormattedMessage>
                                <FormattedMessage id='c_3' defaultMessage='Men & Women  Clothes'>
                                    {value3 => (
                                        <option value="Men & Women  Clothes">{value3}</option>
                                    )}
                                </FormattedMessage>
                                <FormattedMessage id='c_4' defaultMessage='Gadgets & Accessories'>
                                    {value4 => (
                                        <option value="Gadgets & Accessories">{value4}</option>
                                    )}
                                </FormattedMessage>
                                <FormattedMessage id='c_5' defaultMessage='Electronics & Accessories'>
                                    {value5 => (
                                        <option value="Electronics & Accessories">{value5}</option>
                                    )}
                                </FormattedMessage>


                            </select>
                            <label htmlFor="brand">{translate('brand')}</label>
                            <input type="text" name="brand" required='required' className='form-control' onChange={this.handleForm} />
                            <br /><br /> <input type="submit" className="btn btn-info" />

                        </form>
                    </div>
                </I18nProvider>
            );
        }
    }
}

export default CreateProduct;