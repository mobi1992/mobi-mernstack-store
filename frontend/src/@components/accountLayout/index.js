import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { routePaths } from '../../@services/constants'
import skincare from '../../@assets/images/skincare.jpeg'
import { Dashboard, AccountBox, ShoppingBasket, Home, ExitToApp } from '@material-ui/icons'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutuser } from '../../@actions/userActions/logout'

const AccountLayout = ({ children }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const styleOptions = {
        backgroundColor: '#ffe6f0',
        height: window.innerHeight < '100vh' ? '100vh' : 'auto'
    }
    const { logoutUser, loading, isAuthenticated, error } = useSelector(state => state.logoutUser)
    const logoutTheUser = () => {
        dispatch(logoutuser())
        window.location.reload(false).scrollTo(0, 0)
    }

    const linkToAccount = () => {
        navigate(routePaths.my_account)
    }

    const linkToOrders = () => {
        navigate(routePaths.orders)
        window.location.reload(false).scrollTo(0, 0)
    }

    const linkToAccountDetails = () => {
        navigate(routePaths.account_detail)
    }

    const linkToAddresses = () => {
        navigate(routePaths.addresses)
    }
    return (
        <div style={{ backgroundColor: '#ffe6f0', height: 'auto' }}>
            <br></br>
            <>
                <Row className='justify-content-center' style={{ paddingBottom: '350px' }}>
                    <Col lg='10' md='11' sm='11' xs='11'>
                        <Card >
                            <Card.Body>
                                <h3 style={{ fontWeight: 'bold', font: '900 3vh italic' }}>MY ACCOUNT</h3>
                                <br></br>
                                <Row>
                                    <Col className = 'mb-3' style={{ paddingLeft: '2vh' }} lg='3' md='4' sm='12' xs='12'>
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={routePaths.my_account}>
                                            <Row onClick = {linkToAccount}>
                                                <Col style={{ cursor: 'default' }}>Dashboard</Col>
                                                <Col style={{ display: 'flex', justifyContent: 'end', paddingRight : '1vh' }}><Dashboard /></Col>
                                            </Row>
                                        </Link>
                                        <hr></hr>

                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={routePaths.orders}>
                                            <Row onClick = {linkToOrders}>
                                                <Col style={{ cursor: 'default' }}>Orders</Col>
                                                <Col style={{ display: 'flex', justifyContent: 'end', paddingRight : '1vh' }}><ShoppingBasket /></Col>
                                            </Row>
                                        </Link>
                                        <hr></hr>

                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={routePaths.account_detail}>
                                            <Row onClick = {linkToAccountDetails}>
                                                <Col style={{ cursor: 'default' }}>Account Details</Col>
                                                <Col style={{ display: 'flex', justifyContent: 'end', paddingRight : '1vh' }}><AccountBox /></Col>
                                            </Row>
                                        </Link>
                                        <hr></hr>

                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={routePaths.addresses}>
                                            <Row onClick = {linkToAddresses}>
                                                <Col style={{ cursor: 'default' }}>Address</Col>
                                                <Col style={{ display: 'flex', justifyContent: 'end', paddingRight : '1vh' }}><Home /></Col>
                                            </Row>
                                        </Link>
                                        <hr></hr>
                                        <div onClick={logoutTheUser}>
                                            <Row>
                                                <Col style={{ cursor: 'default' }}>Logout</Col>
                                                <Col style={{ display: 'flex', justifyContent: 'end', paddingRight: '1vh' }}><ExitToApp /></Col>
                                            </Row>
                                        </div>
                                    </Col>

                                        <Col lg='8' md='7' sm='12' xs='12'>
                                            {children}
                                        </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        </div>
    )
}

export default AccountLayout