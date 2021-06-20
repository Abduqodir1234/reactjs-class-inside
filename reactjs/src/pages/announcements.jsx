
import 'whatwg-fetch'
import React, { Component } from 'react';
import Navbar from './compenents/Navbar';
import Loading from './compenents/loading';
import Announce_post from './compenents/announce_part';
import axios from 'axios';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/tranlate';
import { Redirect } from 'react-router-dom';

class Announcements extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.count = this.count.bind(this);
    this.lang2 = this.lang2.bind(this)
  }
  state = {
    loading: true,
    posts: [],
    cart: 0,
    wishlist: 0,
    lang: ''
  }
  lang2(ev) {
    localStorage.setItem('lang', ev);
    this.setState({
      lang: ev
    })

  }
  componentDidMount() {
    this.setState({
      posts: [],
    })
    axios.get("http://127.0.0.1:8000/asdfasdf/")
      .then(booksList => {
        console.log(booksList.data)
        if (this.state.posts !== booksList.data) {
          this.setState({ posts: booksList.data, loading: false });
        }
      });
    axios.get('http://127.0.0.1:8000/sdlkewrws/')
      .then(response => {
        this.setState({
          cart: response.data.cart,
          wishlist: response.data.wishlist
        })
      })
  }
  count() {
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
  render() {
    if (this.props.state.user === 'False') {
      return <Redirect to="/" />
    }
    else {
      if (this.state.loading) {
        return <Loading />
      }
      else {
        return (
          <I18nProvider locale={this.lang1()}>
            <div>

              <div className="container">
                <h3>{translate('Your_Announcement')}</h3><br />
                <p>{translate('announce_info')}</p>
                <div className='container'>
                  <div className='row'>
                    {this.state.posts.length > 0 ?
                      <React.Fragment>
                        <table class="table table-hover">
                          <tbody>
                            <tr>
                              <td>{translate('p_name')}</td>
                              <td>{translate('date')}</td>
                              <td>{translate('edit')}</td>
                              <td>{translate('delete')}</td>
                            </tr>
                            {this.state.posts.map(post => <Announce_post key={post.id} mount={this.componentDidMount} post={post} />)}
                          </tbody>
                        </table>
                      </React.Fragment> : <div className='alert alert-danger'>You have never create any announcement</div>}
                  </div></div>
              </div>
            </div>

          </I18nProvider>
        );
      }
    }
  }
}

export default Announcements;