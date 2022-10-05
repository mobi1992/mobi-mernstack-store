import React, { useEffect, useState } from 'react'
import Announcement from '../../@components/announcement'
import CarouselSlider from '../../@components/carousel'
import MetaData from '../../@components/metaData'
import NavBar from '../../@components/navBar'
import ItemCard from '../../@components/product'
import { getProducts } from '../../@actions/productActions/getProducts'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../../@components/loader'
import Error from '../../@components/error'
import { useLocation } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
const SearchedProduct = () => {

    const {keyword} = useParams()
    //reload the previous page when backbutton is clicked
    window.onpopstate = function (event) {
        if (event) {
            // clear local Storage
            // localStorage.removeItem('AllProductsValue')
            window.location.reload(false).scrollTo(0, 0)
        }
    }

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = () => {
        setCurrentPage(page => page + 1)
    }
    
    //   console.log(keyword)
    const dispatch = useDispatch()
    const {loading, error, code, products, resultPerPage, searchedProductsCount} = useSelector(state => state.products )
    const [allProducts, setAllProducts] = useState(products)

    
    
    useEffect(() => {
        // console.log('value2 : ', value2)
        dispatch(getProducts(keyword, currentPage))
        // console.log("All Products : ", allProducts)
    }, [dispatch, keyword, currentPage])

    useEffect(() => {
        setAllProducts(allProducts.concat(products))
        
    }, [products])

   // remove the value from localStorage
    if (code) {
        console.log('code : ', code)
        return <Error error = {error} code = {code} />
    }
    
    else {
        return (
            <div style = {{backgroundColor : '#ffe6f0'}}>
            <MetaData title = 'Rayon'/>
            {/* <Announcement /> */}
            { loading ? <Loader /> : <>
            {/* <NavBar /> */}
            {/* <CarouselSlider /> */}
            <ItemCard products={allProducts} currentPage = {currentPage} productsCount = {searchedProductsCount} resultPerPage = {resultPerPage} setCurrentPageNo = {setCurrentPageNo}/>

            </>}
            </div>
        )
    }
    
}

export default SearchedProduct