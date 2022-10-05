import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
const UsersNoMoreOrders = ({setCurrentPageNo}) => {
  return (
    <Row className='mt-3 mb-3 justify-content-center'>
    <Col></Col>
    <Col lg='3' md='4' sm='4' xs='6'>
        <Row clasName='justify-content-center'>
            <div className='text-center' style={{ background: 'grey', color: 'white', fontWeight: 'bold', padding : '1vh' }} >No More Orders</div>
        </Row>
    </Col>
    <Col></Col>
</Row>
  )
}

export default UsersNoMoreOrders