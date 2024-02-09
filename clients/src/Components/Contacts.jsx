import React, { useState}from 'react';
import '../css/Contacts.css';


export default function Contacts() {
  const [userList, setUserList] = useState([]);

  return (
    <>
    <div className='contact-container'>
        <div className='contact-heading'>
        <h2>Messages</h2>
        <div></div>
        </div>
        {
          userList.map((ele, index) => (
            <div className="contact-box">
            <img src='./images/princeimg.jpg' alt='avtar'/>
            <div>
                <h5>{ele.id}</h5>
            </div>
            </div>
          ))
        }
        
    </div>
    </>
  )
}
