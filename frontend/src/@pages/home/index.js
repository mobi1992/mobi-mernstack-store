import React, { useEffect, useState } from 'react'
import Announcement from '../../@components/announcement'
import CarouselSlider from '../../@components/carousel'
import MetaData from '../../@components/metaData'
import NavBar from '../../@components/navBar'
import ItemCard from '../../@components/product'
import { getCategoryItems } from '../../@actions/categoryActions/getCategoryItems'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../@components/loader'
import './index.css';
import Error from '../../@components/error'
import { Container } from 'react-bootstrap'

const Home = ({isAuthenticated}) => {
    window.onpopstate = function (event) {
        if (event) {
            window.location.reload(false).scrollTo(0, 0)
        }
    }
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = () => {
        setCurrentPage(page => page + 1)
    }
    // const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, categoryProductsSuccess, error, code, categoryProducts, resultPerPage, productsCount } = useSelector(state => state.categoryProducts)


    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        dispatch(getCategoryItems('home', currentPage))
        const catgName = 'home'
        sessionStorage.setItem( 'category', catgName);
    }, [dispatch, currentPage])

    useEffect(() => {
        setAllProducts(allProducts.concat(categoryProducts))
        // console.log("all products", allProducts)
    }, [categoryProducts])

    // clear the localStorage
    localStorage.removeItem('AllProductsValue')


    if (code) {
        console.log('code : ', code)
        return <Error error={error} code={code} />
    }
    else {
        return (
            <div className = 'background_img'>
                <MetaData title='Rayon' />
                {/* <Announcement /> */}
                {loading ? <Loader /> : categoryProductsSuccess && <>
                    {/* <NavBar /> */}
                    <CarouselSlider />
                    {allProducts.length === 0 ? <Container>
                        <div className='mt-3' style={{color: 'white', paddingBottom : '300px' }}>No product in this category!</div>
                    </Container> :
                        <>
                            <div style={{color: 'white', display: 'flex', justifyContent: 'center' }} className='text-center'>
                                <h1 className='home-trending1'>_____ </h1>
                                <h1 className='home-trending'>TRENDING</h1>
                                <h1 className='home-trending1'> _____</h1>
                            </div>
                            <div style={{ paddingLeft: '1vw', paddingRight: '1vw' }}>
                                <ItemCard products={allProducts} currentPage={currentPage} productsCount={productsCount} resultPerPage={resultPerPage} setCurrentPageNo={setCurrentPageNo} isAuthenticated = {isAuthenticated}/>
                            </div>
                        </>
                    }
                </>}
            </div>
        )
    }
}

export default Home