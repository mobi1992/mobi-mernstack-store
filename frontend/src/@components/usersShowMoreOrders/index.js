import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
const UsersShowMoreOrders = ({setCurrentPageNo}) => {
  return (
    <Row className='mt-3 mb-3 justify-content-center'>
    <Col></Col>
    <Col lg='4' md='4' sm='4' xs='6'>
        <Row clasName='justify-content-center'>
            <Button style={{ background: 'maroon', color: 'white', fontSize: '18px', fontWeight: 'bold' }} onClick={setCurrentPageNo} >Load More Orders</Button>
        </Row>
    </Col>
    <Col></Col>
</Row>
  )
}

export default UsersShowMoreOrders