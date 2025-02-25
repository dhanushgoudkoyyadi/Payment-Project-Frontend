import React from 'react'
import img1 from "../images/img1.png"
import './Main.css'
function Main() {
  return (
    <div>
                {/* <StudentPayment/> */}
                <div className="main">
                  <div className="a1">
                  <div className="heading">
                  <p>Best Training for Practical Interactive Learning</p>
                </div>
                <div className="para">
                  <p>Advance your career by Create Application along with Industry Experts. We simplify Complex Problems into Small Steps to build make you to develop yourself.</p>
                  </div>
                  </div>
                
                  <div className="img">
                    <img src={img1} alt="" style={{width:'800px',height:"800px"}} />
                  </div>
                </div>
              </div>
      
  )
}

export default Main