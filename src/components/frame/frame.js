import React, { useEffect, useState } from 'react'
import "./frame.css"
import iphone from "./iPhone.jpg"
const Frame =()=>{

    return(
        <div className='frame'>
            <div className='frameLeft'>
                <p className='frameBtns'>Woman's Fashion</p>
                <p className='frameBtns'>Men's Fashion</p>
                <p className='frameBtns'>Electronics</p>
                <p className='frameBtns'>Home & Lifestyle</p>
                <p className='frameBtns'>Medecine</p>
                <p className='frameBtns'>Sports & Outdoor</p>
                <p className='frameBtns'>Baby's & Toys</p>
                <p className='frameBtns'>Groceries & Pet</p>
                <p className='frameBtns'>Health & Beauty</p>
            </div>
            <div className='frameRight'>

                <img className='iphoneImg' src={iphone}/>
            </div>
             </div>
    )
}

export default Frame;