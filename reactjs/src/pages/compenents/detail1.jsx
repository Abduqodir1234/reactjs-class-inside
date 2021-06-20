import React, { Component } from 'react';
import { I18nProvider } from '../i18n';
import translate from '../i18n/tranlate';
import Carousel_item from './carousel';

class Detail1 extends Component {
    sale = () =>{
        if(this.props.pro.sale)
        {
            return <div><strong>{translate('price')}:</strong>{this.props.pro.price_in_sale} {translate('som')}</div>
        }
        else{
            return <div> <strong>{translate('price')}:</strong> {this.props.pro.price} {translate('som')}</div>
        }
    }
    render() { 
        
        const {picture} = this.props.pro
        console.log(picture)
        // if(!Array.isArray(picture)){
        //     alert(picture);
        // }
        return ( 
        <main>
            <br/>
            <br/>
           <div className="container">
               <div className="row">
                   <div className="col-md-5">
                   <div id="demo" className="carousel slide" data-ride="carousel">
                        <ul className="carousel-indicators">
                            <li data-target="#demo" data-slide-to="0" className="active"></li>
                        </ul>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                            <img src={"http://127.0.0.1:8000"+this.props.pro.img} alt="Los Angeles" style={{maxWidth:'500px',maxHeight:'400px'}}/>
                         
                            </div>
                            {picture.map((pictur) => <Carousel_item key={pictur} picture={pictur} />)}
                        </div>
                        
                     
                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                            <span className="carousel-control-prev-icon " style={{backgroundColor:'black'}}></span>
                        </a>
                        <a className="carousel-control-next " href="#demo" data-slide="next">
                            <span className="carousel-control-next-icon" style={{backgroundColor:'black'}}></span>
                        </a>
                        </div>
                   </div>
                   <div className="col-md-7">
                       <h1> <strong>{translate('p_name')}:</strong> {this.props.pro.name}</h1>
                        {this.sale()} 
                       <div><strong>{translate('brand')}:</strong>{this.props.pro.brand}</div>
                       <div><strong>{translate('a_color')}:</strong>{this.props.pro.color}</div>

                   </div>
               </div>
               <br/><br/>
               <div>
                  <strong>{translate('desc')}:</strong>{this.props.pro.desc}
               </div><br/><br/>
           </div>
           
        </main> 
     
        );
    }
}
 
export default Detail1;