import React from 'react'
import { Button } from 'react-bootstrap';
import './index.css';
import { useNavigate } from 'react-router';
const Error = ({ error, code }) => {
    const navigate = useNavigate()
    return (
        <div className='error'>
            <div>
                <p style={{ fontWeight: 'bolder', fontSize: '10vw', lineHeight : '10vw' ,textAlign: 'center' }}>OOPS! {code}</p>
                {/* <p style={{ fontSize: 'bold', fontSize: '5vw',lineHeight : '5vw', textAlign: 'center' }}>{error}</p> */}
                <div style = {{display : 'flex', justifyContent : 'center', marginTop : '3vw'}}><Button onClick = {() => navigate('/')} style={{ fontWeight: 'bolder', fontSize: '5vw' }} variant='dark'>Return to home</Button></div>
            </div>
        </div>
    )
}

export default Error