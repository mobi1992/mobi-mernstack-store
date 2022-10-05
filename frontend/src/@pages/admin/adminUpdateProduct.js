import React, { useState, useEffect, useMemo } from 'react'
import SideBar from '../../@components/sideBar'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import Loader from '../../@components/loader'
import { getCategories } from '../../@actions/categoryActions/getAllCategories'
import { createNewProduct } from '../../@actions/productActions/createNewProduct'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getProducts } from '../../@actions/productActions/getProducts'
import { debounce } from '../../@components/debounce'
import { updateTheProduct } from '../../@actions/productActions/updateTheProduct'
import { getProductDetail } from '../../@actions/productActions/getProductDetail'
import UpdateProduct from './updateProduct'
import Error from '../../@components/error'

const AdminUpdateProduct = ({ categories, catgLoading }) => {
    const dispatch = useDispatch()
    const { product, productSuccess, code} = useSelector(state => state.product)

    const id = sessionStorage.getItem('id', id)
    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch])

    
    if (code) {
        return <Error code = {code} />
    }

    else {
        return (
            <>
                {catgLoading ? <Loader /> : productSuccess &&
                    <SideBar>
                        <UpdateProduct product = {product} categories = {categories} id = {id}/>
                    </SideBar>}
            </>
        )
    }
}

export default AdminUpdateProduct