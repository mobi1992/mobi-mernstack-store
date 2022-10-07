import React, { useEffect, useState } from 'react'
import Announcement from '../../@components/announcement'
import CarouselSlider from '../../@components/carousel'
import MetaData from '../../@components/metaData'
import NavBar from '../../@components/navBar'
import ItemCard from '../../@components/product'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../@components/loader'
// import './index.css';
import Error from '../../@components/error'
import { getCategoryItems } from '../../@actions/categoryActions/getCategoryItems'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const CategoryItems = ({isAuthenticated}) => {

    //reload the previous page when backbutton is clicked
    window.onpopstate = function (event) {
        if (event) {
            // clear local Storage
            // localStorage.removeItem('AllProductsValue')
            if (sortBy === 'price_asc') { localStorage.setItem('AllCategoryProductsValue', 'Price, low to high') }
            else if (sortBy === 'price_desc') { localStorage.setItem('AllCategoryProductsValue', 'Price, high to low') }
            else if (sortBy === 'createdAt_asc') { localStorage.setItem('AllCategoryProductsValue', 'Date, Old to New') }
            else if (sortBy === 'createdAt_desc') { localStorage.setItem('AllCategoryProductsValue', 'Date, New to Old') }
            window.location.reload(false).scrollTo(0, 0)
        }
    }


    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = () => {
        setCurrentPage(page => page + 1)
    }
    const { name } = useParams()
    // console.log('match is : ' , name)

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery()
    //   const keyword = query.get('keyword') || ''
    let sortBy = query.get('sortBy') || ''
    const dispatch = useDispatch()
    const { loading, error, code, categoryProducts, resultPerPage, productsCount } = useSelector(state => state.categoryProducts)
    // console.log(products)
    // console.log("categoryProducts", categoryProducts)
    // console.log('loading is', loading)
    const [allProducts, setAllProducts] = useState([])

    let val = ''
    const value = localStorage.getItem('AllCategoryProductsValue')
    val = value

    const HandleChange = e => {
        val = e.target.value
        let sort = ''
        if (val === 'Featured Products') { sort = '' }
        else if (val === 'Price, low to high') { sort = 'price_asc' }
        else if (val === 'Price, high to low') { sort = 'price_desc' }
        else if (val === 'Date, Old to New') { sort = 'createdAt_asc' }
        else if (val === 'Date, New to Old') { sort = 'createdAt_desc' }
        // store the target value in localStorage, so that it can be retrieved when the page reloads
        localStorage.setItem('AllCategoryProductsValue', val)
        // reload the page so that the allProducts don't concat when the products change
        navigate(`/Category/${name}/Products?sortBy=${sort}`)
        window.location.reload(false).scrollTo(0, 0)
    }

    useEffect(() => {
        dispatch(getCategoryItems(name, currentPage, sortBy))
        sessionStorage.setItem( 'category', name);
    }, [dispatch, name, currentPage, sortBy])

    useEffect(() => {
        setAllProducts(allProducts.concat(categoryProducts))
        console.log("all products", allProducts)
    }, [categoryProducts])

    // on DOM reload
    useEffect(() => {
        localStorage.removeItem('AllCategoryProductsValue')
        if (sortBy === 'price_asc') { localStorage.setItem('AllCategoryProductsValue', 'Price, low to high') }
        else if (sortBy === 'price_desc') { localStorage.setItem('AllCategoryProductsValue', 'Price, high to low') }
        else if (sortBy === 'createdAt_asc') { localStorage.setItem('AllCategoryProductsValue', 'Date, Old to New') }
        else if (sortBy === 'createdAt_desc') { localStorage.setItem('AllCategoryProductsValue', 'Date, New to Old') }
    }, [])


    if (error) {
        console.log('code : ', code)
        return <Error error={error} code={code} />
    }
    else {
        return (
            <div className = 'background_img'>
                <MetaData title='Rayon' />
                {/* <Announcement /> */}
                {loading ? <Loader /> : <>
                    {/* <NavBar /> */}
                    {allProducts.length === 0 ? <Container>
                        <div className='mt-3' style={{color: 'white', paddingBottom : '300px' }}>No product in this category!</div>
                    </Container> :
                        <>
                        <br></br>
                            <div style = {{color : 'white', marginLeft: '2vw'}}>{name}</div>
                            <br></br>
                            <div style={{color: 'white', marginLeft: '2vw' }}>Sort Products : <span>
                                <select style = {{color : 'white'}} onChange={HandleChange} value={val}>
                                    {/* <option disabled selected>sort by price</option> */}
                                    <option>Featured Products</option>
                                    <option>Price, low to high</option>
                                    <option>Price, high to low</option>
                                    <option>Date, Old to New</option>
                                    <option>Date, New to Old</option>
                                </select>
                            </span></div>
                            <div style={{paddingLeft: '1vw', paddingRight: '1vw' }}>
                            <ItemCard products={allProducts} currentPage={currentPage} productsCount={productsCount} resultPerPage={resultPerPage} setCurrentPageNo={setCurrentPageNo} isAuthenticated = {isAuthenticated}/>
                            </div>
                        </>}
                </>}
            </div>
        )
    }

}

export default CategoryItems