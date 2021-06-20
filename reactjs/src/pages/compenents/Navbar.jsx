import React, { Component } from 'react';
import cookie from 'react-cookies'
import axios from 'axios'
import Loading from './loading';
import {
  Link, NavLink
} from "react-router-dom";
import { I18nProvider, LOCALES } from '../i18n'
import translate from '../i18n/tranlate'

class Navbar extends Component {
  render() {
    const lang = localStorage.getItem('lang') || 'en'
    return (
      <I18nProvider locale={this.props.lang1()}>
        <div>
          <nav className="navbar navbar-expand-md bg-light navbar-light ">
            <a className="navbar-brand" href="#">{translate('logo')}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink exact to="/"><div className='nav-link'>{translate('home')}</div></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/product_list"><div className='nav-link'>{translate('list')}</div></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/contact"><div className="nav-link">{translate('contact')}</div></NavLink>
                </li>
                {/* <li className="nav-item">
                <Link to="/animation/"><div className="nav-link">{translate('animation')}</div></Link>
              </li>  */}
                <li className="nav-item">
                  <NavLink exact to="/map/"><div className="nav-link">{translate('map')}</div></NavLink>
                </li>
                {this.props.state.user !== 'False' ?
                  <React.Fragment>
                    <li className="nav-item">
                      <NavLink exact to={this.props.url()}><div className="nav-link">{translate('c_a')}</div></NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink exact to={this.props.url2}><div className="nav-link">{translate('y_a')}</div></NavLink>
                    </li>
                  </React.Fragment>
                  : ''}
                {this.props.state.user !== 'False' ? <React.Fragment>
                  <li className="nav-item">
                    <NavLink exact to='/cart/' ><div className="nav-link">{translate('cart')} <div className="badge badge-info"> {this.props.state.cart} </div></div></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact to='/wishlist/'><div className="nav-link">{translate('wishlist')}<div className="badge badge-info">{this.props.state.wishlist}</div> </div></NavLink>
                  </li></React.Fragment>
                  : ''}
              </ul>
              <div className="form-inline my-2 my-lg-0">
                <br />
                <div>{this.props.authenticated()}</div>

              </div>
              <div className="form-inline my-2 my-lg-0">

                <div class="dropdown show">
                  <a style={{ textDecoration: 'none', color: 'black' }} class="dropdown-toggle mr-5 pr-5" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {lang}
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div style={{ cursor: 'pointer' }} onClick={() => this.props.lang2("en")} class="dropdown-item">{translate('en')}</div>
                    <div style={{ cursor: 'pointer' }} onClick={() => this.props.lang2("ru")} class="dropdown-item">{translate('ru')}</div>
                    <div style={{ cursor: 'pointer' }} onClick={() => this.props.lang2("uz")} class="dropdown-item">{translate('uz')}</div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </I18nProvider>
    );
  }
}

export default Navbar;