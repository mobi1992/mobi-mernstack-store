import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined, AccountCircle } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Navbar, Nav, InputGroup, FormControl, Form, Container, Offcanvas } from 'react-bootstrap'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link, Redirect, useNavigate } from 'react-router-dom'
import AccountPopover from './accountPopover'
import SearchPopover from './searchPopover'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../@actions/categoryActions/getAllCategories'
import { routePaths } from '../../@services/constants'
const NavBar = ({userDetails, getCartItems}) => {
    const dispatch = useDispatch()
    const { categories, loading } = useSelector(state => state.categories)
    console.log(categories)
    const navigate = useNavigate()
    const linkToHome = () => {
        navigate('/')
        window.location.reload(false).scrollTo(0, 0)
    }
    const refresh = e => {
        navigate(`/Category/${e.currentTarget.id}/Products`)
        window.location.reload(false).scrollTo(0, 0)
        
    }
    const refreshProducts = () => {
        navigate(routePaths.allProducts)
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToCart = () => {
        navigate(routePaths.mainCart)
        window.location.reload(false).scrollTo(0, 0)
    }
    useEffect(() => {
        dispatch(getCategories())
        // console.log(categories)
    }, [dispatch])
    
    return (
        <>
        {getCartItems && 
        <div>
        <div className='nav-display-on-large-screens'>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    <div style={{ paddingTop: '1.5vh', paddingLeft: "1vh", paddingBottom: '1.5vh', display: 'flex', justifyContent: 'left' }}>
                        <Navbar.Brand>
                            <h1 style={{ fontWeight: 'bold' }}>RAYON</h1>
                        </Navbar.Brand>
                    </div>
                </div>
                <div style={{ paddingTop: '3vh', flex: '3', display: 'flex', justifyContent: 'center', cursor: "pointer" }}>
                    {/* <Link style={{ color: 'grey', textDecoration: 'none' }} to={routePaths.allProducts}> */}
                        <Nav.Item onClick = {refreshProducts}>  
                            <p className='text-muted nav-item'>All Products</p>
                        </Nav.Item>
                    {/* </Link> */}
                    {/* <Link style={{ color: 'grey', textDecoration: 'none' }} to={'/'}> */}
                    <Nav.Item style={{ color: 'grey' }} onClick={linkToHome}>
                        <p className='text-muted nav-item'>Home</p>
                    </Nav.Item>
                    {/* </Link> */}
                    {categories.map(category => {
                        if (category.name !== 'home') {
                            return (
                                // <Link style={{ color: 'grey', textDecoration: 'none' }} to={`/category/${category.name}/products`}>
                                <Nav.Item id={category.name} style={{ color: 'grey' }} onClick={refresh}>
                                    <p className='text-muted nav-item'>{category.name}</p>
                                </Nav.Item>
                                // </Link>
                            )
                        }
                    })}
                </div>
                <div style={{ fontSize: '12px', paddingTop: '1vh', paddingBottom: '1vh', paddingRight: '1vw', flex: '1', display: 'flex', justifyContent: 'end' }}>
                    <Nav.Item style={{ color: 'black' }} className='seen'>
                        <div style={{ paddingLeft: '1vh' }}><AccountCircle /></div>
                        <p>Account</p>
                        <AccountPopover userDetails = {userDetails}/>
                    </Nav.Item>
                    <Nav.Item style={{ color: 'black' }} className='search_seen'>
                        <div style={{ paddingLeft: '1vh' }}><Search /></div>
                        <p>Search</p>
                        <SearchPopover />
                    </Nav.Item>
                    <div onClick = {linkToCart} style={{ paddingTop: '1vh', paddingBottom: '2vh', paddingLeft: '2vh' }}>
                        <Badge  badgeContent={getCartItems.cart.totalQuantity} color="primary">
                            <ShoppingCartOutlined color="action" />
                        </Badge>
                    </div>
                </div>
            </div>
        </div>

        <div className='nav-display-on-small-screens'>
            <Navbar expand={false}>
                <Navbar.Toggle className='toggle-icon' aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas style={{ paddingTop: '0.5vh', paddingBottom: '0.5vh' }}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Anything you want!</Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr className='text-mute'></hr>
                    <Offcanvas.Body>
                        <Nav style={{ cursor: 'pointer' }} className="justify-content-end flex-grow-1 pe-3">
                            {/* <Link style={{ color: 'grey', textDecoration: 'none' }} to={routePaths.allProducts}> */}
                                <Nav.Item onClick = {refreshProducts}>
                                    <p className='text-muted nav-item'>All Products</p>
                                </Nav.Item>
                            {/* </Link> */}
                            {/* <Link style={{ color: 'grey', textDecoration: 'none' }} to={'/'}> */}
                            <Nav.Item style={{ color: 'grey' }} onClick={linkToHome}>
                                <p className='text-muted nav-item'>Home</p>
                            </Nav.Item>
                            {/* </Link> */}
                            {categories.map(category => {
                                if (category.name !== 'home') {
                                    return (
                                        // <Link style={{ color: 'grey', textDecoration: 'none' }} to={`/category/${category.name}/products`}>
                                        <Nav.Item id={category.name} style={{ color: 'grey' }} onClick={refresh}>
                                            <p className='text-muted nav-item'>{category.name}</p>
                                        </Nav.Item>
                                        // </Link>
                                    )
                                }
                            })}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Navbar.Brand >
                        <h2 style={{ fontWeight: 'bold' }}>RAYON</h2>
                    </Navbar.Brand>
                </div>
                <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'end' }}>
                    <Nav.Item className='seen'>
                        <AccountCircle />
                        <AccountPopover userDetails = {userDetails} />
                    </Nav.Item>
                    <Nav.Item className='search_seen'>
                        <Search />
                        <SearchPopover />
                    </Nav.Item>
                    <div onClick = {linkToCart} style={{ paddingTop: '0.25vw', paddingRight: '2vw', paddingLeft: '1vw' }}>
                        <Badge  badgeContent={getCartItems.cart.totalQuantity} color="primary">
                            <ShoppingCartOutlined color="action" />
                        </Badge>
                    </div>
                </div>
            </Navbar>
        </div>
    </div>}
        </>
    )
}

export default NavBar