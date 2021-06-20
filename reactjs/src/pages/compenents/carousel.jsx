import React, { Component } from 'react';

class Carousel_item extends Component {
    render() { 
        return (
            <div class="carousel-item">
                <img src={"http://127.0.0.1:8000/images/" + this.props.picture + '/'} alt="Chicago" style={{maxWidth:'500px',maxHeight:'400px'}}/>  
            </div>  
          );
    }
}
 
export default Carousel_item;