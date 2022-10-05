import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
const ShowMore = ({setCurrentPageNo}) => {
  return (
    <Row className='mt-3 mb-3 justify-content-center'>
    <Col></Col>
    <Col lg='2' md='3' sm='4' xs='6'>
        <Row clasName='justify-content-center'>
            <Button style={{ background: 'maroon', color: 'white', fontSize: '18px', fontWeight: 'bold' }} onClick={setCurrentPageNo} >Show More</Button>
        </Row>
    </Col>
    <Col></Col>
</Row>
  )
}

export default ShowMore