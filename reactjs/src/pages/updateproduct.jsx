import axios from 'axios';
import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies'
import { FormattedMessage } from 'react-intl';
import { Redirect,useParams} from 'react-router-dom';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/tranlate';
const UpdateProduct = props => {
    const [state,setState] = useState({
            name:null,
            color:null,
            desc:null,
            price:null,
            sale:false,
            price_in_sale:2,
            quantity:null,
            img:undefined,
            size:null,
            category:null,
            brand:null,
            cart:0,
            wishlist:0,
            lang:''
    })
    const [redirect,setredirect] = useState(false)
    const { id } = useParams();
      useEffect(()=>{

        axios.get('http://127.0.0.1:8000/detail/' + id + '/')
        .then(response => {
            setState({
                name :response.data.name,
                color :response.data.color,
                desc :response.data.desc,
                price :response.data.price,
                sale :response.data.sale,
                price_in_sale :response.data.price_in_sale,
                quantity :response.data.quantity,
                img :response.data.img,
                size :response.data.size,
                category :response.data.category,
                brand :response.data.brand,
            })
        })
      },[])
    
    console.log('Reloaded')
    const lang1 = () => {
        if(localStorage.getItem('lang') === 'en'){
            return LOCALES.English
        }
        else if(localStorage.getItem('lang')=== 'ru'){
            return LOCALES.Russian 
        }
        else if(localStorage.getItem('lang')=== 'uz'){
            return LOCALES.Uzbek
        }
    }
    const handleForm = (event) =>{
        if(event.target.name === 'sale'){
            if(event.target.checked === true)
            {
                setState({...state,
                    sale:null
                })
                setState({...state,
                    sale:true
                })
              
            }
            else{
                setState({...state,
                    sale:null
                })
                setState({...state,
                    sale:false
                   })
               
            }
        }
        else{
            setState({...state,
                [event.target.name]:event.target.value,
            })
           
        }


    }
    const price = () => {
        if(state.sale)
        {
            return ( <div>
                 <label htmlFor="price_in_sale">Price In Sale</label>
                <input type="number" value='1' name="price_in_sale" value={state.price_in_sale} readOnly className='form-control' onChange={handleForm} />
            </div> )
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(id)
        let csrf = cookie.load('csrftoken');
        var formData = new FormData();
        formData.append('name', state.name)
        formData.append('color', state.color)
        formData.append('desc', state.desc)
        formData.append('price', state.price)
        formData.append('price_in_sale', state.sale ? state.price_in_sale : 2)
        formData.append('sale', state.sale)
        formData.append('quantity', state.quantity)
        formData.append('size', state.size)
        formData.append('category', state.category)
        formData.append('brand', state.brand)
        if(typeof(state.img)!== typeof("zxcsdfasd")){
            console.log('Not string')
            formData.append('img', state.img)
        }
        event.preventDefault();
        axios({
            method:'PUT',
            url:'http://127.0.0.1:8000/detail/' + id + '/',
            headers:{
                "Content-Type": "multipart/form-data",
                'X-CSRFToken':csrf
            },
            data:formData,
            credentials:'include'
        })
        .then(response =>{
            console.log(response)
            setredirect(true)
        })
        axios.get('http://127.0.0.1:8000/sdlkewrws/')
        .then(response => {
            setState({...state,
            cart:response.data.cart,
            wishlist:response.data.wishlist
            })
            
        })
    }
    const handleFileForm = (event)  => 
    {
        event.preventDefault();
        let files = event.target.files;
        setState({
            lang:'asdasdf'
        })
        setState({...state,
            img: files[0]
        });
        console.log(state.img)
    }
        if(props.user === 'False'){
            return <Redirect to='/' />
        }
        else{
            if(redirect){
                return <Redirect to="/announcement/" />
            }
            else{
                return ( 
                    <I18nProvider locale={lang1()}>
                     <div className='container'>
                        <form  onSubmit={handleSubmit} className='container' encType="multipart/form-data">
                             <label htmlFor='name'>{translate('p_name')}</label>
                             <input type="text" id='name' defaultValue={state.name}  name="name" className='form-control' onChange={handleForm} required='required' />
                             <label htmlFor="quantity">{translate('quantity')}</label>
                             <input type="number" id='quantity' defaultValue={state.quantity} className='form-control' name="quantity" required='required' onChange={handleForm}/>
                             <label htmlFor="price">{translate('price')}</label>
                             <input type="number" id='price' name="price" defaultValue={state.price} readOnly className='form-control' onChange={handleForm} />
                             <div className="custom-control custom-checkbox">
                                 <input type="checkbox" className="custom-control-input" id="customCheck" name="sale" checked={state.sale} onChange={handleForm} />
                                 <label className="custom-control-label" htmlFor="customCheck"> {translate('sale')}</label>
                             </div>
                             {price()}
                             <label htmlFor="img">{translate('main_image')}</label> 
                             <input type="file" name='img' accept='.jpg,.png,.svg'  defaultValue={state.img}  onChange={handleFileForm}/> <label onClick={handleSubmit} className='btn btn-sm btn-info'>Preview</label> <br/>
                              <label> <img src={state.img} width='100px' height='100px' /></label><br/>
                             <label htmlFor="size">{translate('size')}</label>
                             <input type="text"  name="size" className='form-control' defaultValue={state.size} onChange={handleForm} />
                             <label htmlFor="color">{translate('a_color')}</label>
                             <input type="text"  name="color" className='form-control' defaultValue={state.color} onChange={handleForm} />
                             <label htmlFor="desc">{translate('desc')}</label>
                             <textarea  cols="30" rows="10" name="desc" defaultValue={state.desc} className='form-control' onChange={handleForm}></textarea>
                             <label htmlFor="category">{translate('category')}</label>
                             <select name="category" value={state.category} class="custom-select mb-3" onChange={handleForm}>
                            <FormattedMessage id='c_1' defaultMessage='Fashion & Beauty'>
                                     {value1 =>(
                                         <option selected  value="Fashion & Beauty">{value1}</option>
                                     )}
                            </FormattedMessage>
                           
                            (<FormattedMessage id='c_1' defaultMessage='Fashion & Beauty'>
                                     {value1 =>(
                                         <option  value="Fashion & Beauty">{value1}</option>
                                     )}
                            </FormattedMessage>                        
                                 <FormattedMessage id='c_2' defaultMessage='Kids & Babies Clothes'>
                                     {value2 =>(
                                         <option value="Kids & Babies Clothes">{value2}</option>
                                     )}
                                 </FormattedMessage>
                                 <FormattedMessage id='c_3' defaultMessage='Men & Women  Clothes'>
                                     {value3 =>(
                                         <option value="Men & Women  Clothes">{value3}</option>
                                     )}
                                 </FormattedMessage>
                                 <FormattedMessage id='c_4' defaultMessage='Gadgets & Accessories'>
                                     {value4 =>(
                                         <option value="Gadgets & Accessories">{value4}</option>
                                     )}
                                 </FormattedMessage>
                                 <FormattedMessage id='c_5' defaultMessage='Electronics & Accessories'>
                                     {value5 =>(
                                         <option value="Electronics & Accessories">{value5}</option>
                                     )}
                                 </FormattedMessage>
                             </select>
                             <label htmlFor="brand">{translate('brand')}</label>
                             <input type="text" name="brand" defaultValue={state.brand} className='form-control' onChange={handleForm}  />
                            <br/><br/> <input type="submit" onClick={handleSubmit} className="btn btn-info" />
         
                         </form>
                     </div>
                    </I18nProvider>
                  );
            }
        }
    }

export default UpdateProduct;