import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Card, Image, Navbar } from 'react-bootstrap'
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import img from '../../@assets/images/img.png'
import 'react-pro-sidebar/dist/css/styles.css';
import { routePaths } from '../../@services/constants'
import './index.css'
import { logoutuser } from '../../@actions/userActions/logout'
import { useDispatch, useSelector } from 'react-redux'
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import { getCategories } from '../../@actions/categoryActions/getAllCategories'
const SideBar = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [collapsedSidebar, setCollapsedSidebar] = useState(false);
    const [hiddenSidebar, setHiddenSidebar] = useState(false);

    // const [show, setShow] = useState(false)
    const [show, setShow] = useState(false)
    const logout = () => {
        dispatch(logoutuser())
        window.location.reload(false).scrollTo(0, 0)
    }
    const { catgLoading, categories } = useSelector(state => state.categories)
    const linkToProducts = () => {
        navigate(routePaths.adminAllProducts)
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToHome = () => {
        navigate(routePaths.adminHome)
        window.location.reload(false).scrollTo(0, 0)
    }
    const click = (e) => {
        navigate(`/admin/Category/${e.currentTarget.id}/Products`)
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToOrders = () => {
        navigate(routePaths.admin_all_orders)
        window.location.reload(false).scrollTo(0, 0)
    }
    const linkToUsers = () => {
        navigate(routePaths.admin_get_all_users)
        window.location.reload(false).scrollTo(0, 0)
    }
    return (
        <>
            {catgLoading === false &&
                <>
                    <div style={{ display: 'flex' }} className="sidebar p-0 m-0">
                        <div className='sidebar'>
                            <ProSidebar breakPoint="lg" toggled={hiddenSidebar} collapsed={collapsedSidebar} image="https://m.media-amazon.com/images/I/51fomqrDmAL._SL1000_.jpg" onToggle={() => setHiddenSidebar(!hiddenSidebar)}>
                                {!collapsedSidebar && <SidebarHeader>
                                    <Row className="p-5 m-0 justify-content-center">
                                        <Image style={{ width: '80%', height: '80%', borderRadius: '50%' }} src={img} />
                                    </Row>
                                </SidebarHeader>}
                                <SidebarContent>
                                    <Menu className="bg-transparent" iconShape="circle">
                                        <MenuItem style = {{color : 'black'}} icon={<span style = {{color : 'white'}}><i class="fa fa-tachometer"></i></span>}>
                                            <Link style = {{color : 'black'}} to={routePaths.adminAccount}>
                                            Dashboard
                                            </Link>
                                        </MenuItem>
                                        <MenuItem icon={<span style = {{color : 'white'}}> <i className='fas fa-plus-circle'></i></span>}>
                                            <Link style = {{color : 'black'}} to={routePaths.createCategory}>

                                                Create & Update Category
                                            </Link>

                                        </MenuItem>
                                        <MenuItem icon={<span style = {{color : 'white'}}> <i className='fas fa-plus-square'></i></span>}>
                                            <Link style = {{color : 'black'}} to={routePaths.createProduct}>

                                                Create Product
                                            </Link>

                                        </MenuItem>
                                        <SubMenu style = {{color : 'black'}} title='Categories' icon={<span style = {{color : 'white'}}> <i class="fas fa-solid fa-store"></i></span>}>
                                            <MenuItem onClick = {linkToProducts} style = {{color : 'black'}}  icon={<span> <i class="fas fa-solid fa-tags"></i></span>}>
                                                <Link style = {{color : 'black'}} to = {routePaths.adminAllProducts}>
                                                    All Products
                                                    </Link>
                                            </MenuItem>
                                            <MenuItem style = {{color : 'black'}} onClick = {linkToHome} icon={<span> <i class="fas fa-solid fa-tag"></i></span>}>
                                                <Link style = {{color : 'black'}} to = {routePaths.adminHome}>
                                                    Home
                                                    </Link>
                                            </MenuItem>
                                            {categories.map(catg => {
                                                if (catg.name !== 'home') {
                                                    return (
                                                        <MenuItem style = {{color : 'black'}} id={catg.name} onClick={click} icon={<span> <i class="fas fa-solid fa-tag"></i></span>}>
                                                            <Link style = {{color : 'black'}} to = {`/admin/Category/${catg.namr}/Products`}>
                                                            {catg.name}
                                                            </Link>
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </SubMenu>
                                        <MenuItem onClick={linkToOrders} icon={<span style = {{color : 'white'}}><ListAltIcon /></span>}>
                                            <Link style = {{color : 'black'}} to={routePaths.admin_all_orders}>
                                            Orders
                                            </Link>
                                        </MenuItem> 
                                        <MenuItem onClick={linkToUsers} icon={<span style = {{color : 'white'}}><PeopleIcon /></span>}>
                                            <Link style = {{color : 'black'}} to={routePaths.admin_get_all_users}>
                                            Users
                                            </Link>
                                        </MenuItem>  
                                    </Menu>
                                </SidebarContent>
                                <SidebarFooter style={{ textAlign: 'center' }}>
                                    <div style={{ cursor: 'default', color : 'black' }} onClick={logout} className='mt-3 mb-3'>

                                        <span>
                                            <i class="fa fa-power-off" aria-hidden="true"></i>
                                        </span>
                                        {!collapsedSidebar && <span>  Logout</span>}

                                    </div>
                                </SidebarFooter>
                            </ProSidebar>
                        </div>
                        <div style={{ flex: '4' }} className='m-0 p-0 text-left'>
                            <Navbar style={{ display: 'flex', alignItems: 'center' }} className='navbar-color'>
                                {/* Collapsed display on big screens (bigger than md), no collapsed display on small screens (smaller than md) */}
                                <Navbar.Brand bg='dark' className='dis-none'>
                                    <span style={{ paddingRight: '2vh', paddingLeft: '2vh' }} onClick={() => setCollapsedSidebar(!collapsedSidebar)}><i class="fas fa-bars"></i></span>
                                    <span><h2 style={{ fontWeight: 'bold', display: 'inline' }}>RAYON</h2></span>
                                </Navbar.Brand>
                                {/* Hidden display on small screens (smaller than md), no hidden display on big screens (bigger than md) */}
                                <Navbar.Brand bg='dark' className='pl-1 dis-lg-none'>
                                    <span style={{ paddingRight: '1.5vh', paddingLeft: '1.5vh' }} onClick={() => setHiddenSidebar(!hiddenSidebar)}><i class="fas fa-bars"></i></span>
                                    <span><h2 style={{ fontWeight: 'bold', display: 'inline' }}>RAYON</h2></span>
                                </Navbar.Brand>
                            </Navbar>
                            <Col className="p-0 m-0">
                                {children}
                            </Col>
                        </div>
                        {/* {show && <AddRecordModal show = {show} setShow = {setShow}/>} */}
                    </div>
                </>}
        </>
    )
}

export default SideBar
