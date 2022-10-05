import React, { useEffect, useState } from 'react'
import Announcement from '../../@components/announcement'
import CarouselSlider from '../../@components/carousel'
import MetaData from '../../@components/metaData'
import NavBar from '../../@components/navBar'
import ItemCard from '../../@components/adminProducts'
import { getProducts } from '../../@actions/productActions/getProducts'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../@components/loader'
import Error from '../../@components/error'
import { useLocation } from 'react-router-dom'
import { Button, Row, Col, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import SideBar from '../../@components/sideBar'
const AdminAllProducts = () => {


    //reload the previous page when backbutton is clicked
    window.onpopstate = function (event) {
        if (event) {
            // clear local Storage
            // localStorage.removeItem('AllProductsValue')
            if (sortBy === 'price_asc') { localStorage.setItem('AllProductsValue', 'Price, low to high') }
            else if (sortBy === 'price_desc') { localStorage.setItem('AllProductsValue', 'Price, high to low') }
            else if (sortBy === 'createdAt_asc') { localStorage.setItem('AllProductsValue', 'Date, Old to New') }
            else if (sortBy === 'createdAt_desc') { localStorage.setItem('AllProductsValue', 'Date, New to Old') }
            window.location.reload(false).scrollTo(0, 0)
        }
    }

    const { keyword } = ''
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = () => {
        setCurrentPage(page => page + 1)
    }
    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery()
    //   const keyword = query.get('keyword') || ''
    let sortBy = query.get('sortBy') || ''
    //   console.log(keyword)
    const dispatch = useDispatch()
    const { loading, error, code, products, productsCount, resultPerPage, searchedProductsCount } = useSelector(state => state.products)
    const [allProducts, setAllProducts] = useState(products)

    // get the handleChange value from localStorage
    let val = ''
    const value = localStorage.getItem('AllProductsValue')
    // let sortBy = ''
    // console.log('value : ', value)
    val = value
    // setVal(value)
    const HandleChange = e => {
        val = e.target.value
        let sort = ''
        if (val === 'Featured Products') { sort = '' }
        else if (val === 'Price, low to high') { sort = 'price_asc' }
        else if (val === 'Price, high to low') { sort = 'price_desc' }
        else if (val === 'Date, Old to New') { sort = 'createdAt_asc' }
        else if (val === 'Date, New to Old') { sort = 'createdAt_desc' }
        // store the target value in localStorage, so that it can be retrieved when the page reloads
        localStorage.setItem('AllProductsValue', val)
        // reload the page so that the allProducts don't concat when the products change
        navigate(`/admin/All/Products?sortBy=${sort}`)
        window.location.reload(false).scrollTo(0, 0)
    }
    useEffect(() => {
        // console.log('value2 : ', value2)
        dispatch(getProducts(keyword, currentPage, sortBy))
        // console.log("All Products : ", allProducts)
    }, [dispatch, keyword, currentPage, sortBy])

    useEffect(() => {
        setAllProducts(allProducts.concat(products))
        const catgName = 'All Products'
        sessionStorage.setItem( 'category', catgName);
    }, [products])

    // on DOM reload
    useEffect(() => {
        // remove the value from localStorage
        localStorage.removeItem('AllProductsValue')
        if (sortBy === 'price_asc') { localStorage.setItem('AllProductsValue', 'Price, low to high') }
        else if (sortBy === 'price_desc') { localStorage.setItem('AllProductsValue', 'Price, high to low') }
        else if (sortBy === 'createdAt_asc') { localStorage.setItem('AllProductsValue', 'Date, Old to New') }
        else if (sortBy === 'createdAt_desc') { localStorage.setItem('AllProductsValue', 'Date, New to Old') }
    }, [])

    if (code) {
        console.log('code : ', code)
        return <Error error={error} code={code} />
    }

    else {
        return (
            <SideBar>
                <div style={{ paddingLeft: '1vw', paddingRight: '1vw' }}>
                    <MetaData title='Rayon' />
                    {/* <Announcement /> */}
                    {loading ? <Loader /> : <>
                        {/* <NavBar /> */}
                        {allProducts.length === 0 ? <Container>
                            <div className='mt-3'>No product in this category!</div>
                        </Container> :
                            <>
                                <br></br>
                                <div style={{ marginLeft: '2vw' }}>All Products</div>
                                <br></br>
                                <div style={{ marginLeft: '2vw' }}>Sort Products : <span>
                                    <select onChange={HandleChange} value={val}>
                                        {/* <option disabled selected>sort by price</option> */}
                                        <option>Featured Products</option>
                                        <option>Price, low to high</option>
                                        <option>Price, high to low</option>
                                        <option>Date, Old to New</option>
                                        <option>Date, New to Old</option>
                                    </select>
                                </span></div>
                                {/* <CarouselSlider /> */}
                                <ItemCard products={allProducts} currentPage={currentPage} productsCount={productsCount} resultPerPage={resultPerPage} setCurrentPageNo={setCurrentPageNo} />
                            </>}
                    </>}
                </div>
            </SideBar>
        )
    }

}

export default AdminAllProducts