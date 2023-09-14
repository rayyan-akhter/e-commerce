import React from 'react'
import "./topHeader.css"
const TopHeader = () =>{
    
    return(
        <div className='topHeader'>
            <div className='center'>
                <p>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                </p>
                <button className='topHeaderBtn'>ShopNow</button>
            </div>
            <div className='topHeaderRight'>
                <button className='topHeaderBtn'>English</button>
            </div>
        </div>
    )
}
export default TopHeader;