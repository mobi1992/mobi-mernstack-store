import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import NoMoreProducts from '../noMoreProducts'
import ShowMore from '../showMore'
import Item from './item'

const ItemCard = ({ products, currentPage, setCurrentPageNo, productsCount, resultPerPage }) => {
    // console.log(products[0])
    // console.log(products.length)
    // console.log('productsCount', productsCount)
    // console.log('resultPerPage',resultPerPage)
    // console.log('currentPage', currentPage)

    if (resultPerPage * currentPage < productsCount) {
        return (
            <>
            <Row className='justify-content-left' style = {{paddingBottom : '300px'}}>
                {products.map(product => {
                    return (
                        <Item product={product} />
                    )
                })}
            </Row>
                <ShowMore setCurrentPageNo={setCurrentPageNo} /> 
        </>
        )
    }

    else if (currentPage === 1) {
        return (
            <>
            <Row className='justify-content-left' style = {{paddingBottom : '300px'}}>
                {products.map(product => {
                    return (
                        <Item product={product} />
                    )
                })}
            </Row> 
        </>
        )
    }
    else {
    return (
        <>
            <Row className='justify-content-left'>
                {products.map(product => {
                    return (
                        <Item product={product} />
                    )
                })}
            </Row>
                <NoMoreProducts />
        </>
    )
}
}

export default ItemCard