import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductDetails from './productDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../@actions/productActions/getProductDetail'
import Loader from '../../@components/loader'
import Error from '../../@components/error'


const AdminProductDetail = ({userDetails, categories, catgLoading}) => {
    const [activeStep, setActiveStep] = useState(0)
    const next = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    window.onpopstate = function (event) {
        if (event) {
            window.location.reload(false).scrollTo(0, 0)
        }
    }

    const category = sessionStorage.getItem('category')
    console.log("user details", userDetails)
    const { id } = useParams()

    // save the id in session storage
    sessionStorage.setItem('id', id)
    const dispatch = useDispatch()
    const { loading, productError, code, product, productSuccess } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch])

    console.log('code........................', code)
    if (code) {
        console.log('code : ', code)
        return <Error code={code} />
    }

    else {
  return (
    <div>
        {loading ? <Loader /> : productSuccess && <ProductDetails next = {next} userDetails = {userDetails} product = {product} code = {code} loading = {loading} productSuccess = {productSuccess} category = {category} id = {id}/>}
    </div>
  )
}
}

export default AdminProductDetail