import React from 'react'
import speaker from "./speaker.jpg"
import "./secondFrame.css"
const SecondFrame =()=>{
    return  (

        <div className='secondFrameContainer'>
            <img src={speaker} alt='speaker' className='secondFrameContainerImage' />
        </div>
    )

}

export default SecondFrame;