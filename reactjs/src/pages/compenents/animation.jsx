import React, { Component,useEffect } from 'react';
import { Spring,useSpring,animated,Transition,useTransition } from 'react-spring'
import Navbar from './Navbar'
import Aos from 'aos'
import 'aos/dist/aos.css'
import 'aos/dist/aos.js'
const App = () => {
    let state={
        wishlist:0,
        cart:0
    }
    useEffect(() =>{
        Aos.init({duration:1200});
    })    
    const props3 = useSpring({
        from:{
            opacity:0,
            width:'0%',
             
        },
        to:{
            opacity:1,
            width:'70%',
            
        },
     
       
    })
    return  (
                <div>
               
                    <div  className="progress" >
                        <animated.div style={props3} className="progress-bar progress-bar-striped">70%</animated.div>
                    </div>
                    <div data-aos='fade-left' className='container p-3 aos-init aos-animate'>
                        <div style={{width:'300px',height:'400px',padding:'10px',borderRadius:'15px',backgroundColor:'lavender',wordBreak:'break-all'}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, accusantium fuga magni quod cum neque ex? Possimus voluptate facilis dolores. Blanditiis, architecto. Ad quasi, dolorem repellendus rerum itaque debitis repudiandae. </div>
                    </div>
                    <div data-aos='fade-right'  className='container p-3 aos-init aos-animate'>
                        <div style={{width:'300px',height:'400px',padding:'10px',borderRadius:'15px',backgroundColor:'lavender',wordBreak:'break-all'}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, accusantium fuga magni quod cum neque ex? Possimus voluptate facilis dolores. Blanditiis, architecto. Ad quasi, dolorem repellendus rerum itaque debitis repudiandae. </div>
                    </div>
                    <div data-aos='fade-bottom'  className='container p-3 aos-init aos-animate'>
                        <div style={{width:'300px',height:'400px',padding:'10px',borderRadius:'15px',backgroundColor:'lavender',wordBreak:'break-all'}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, accusantium fuga magni quod cum neque ex? Possimus voluptate facilis dolores. Blanditiis, architecto. Ad quasi, dolorem repellendus rerum itaque debitis repudiandae. </div>
                    </div>
                    <div data-aos='fade-up'  className='container p-3 aos-init aos-animate'>
                        <div style={{width:'300px',height:'400px',padding:'10px',borderRadius:'15px',backgroundColor:'lavender',wordBreak:'break-all'}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, accusantium fuga magni quod cum neque ex? Possimus voluptate facilis dolores. Blanditiis, architecto. Ad quasi, dolorem repellendus rerum itaque debitis repudiandae. </div>
                    </div>
                       

      </div>
      
            );
  }
   
  export default App;

