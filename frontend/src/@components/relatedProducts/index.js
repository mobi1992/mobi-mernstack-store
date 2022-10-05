import React from 'react'
import Item from './item'

const RelatedProductsItemCard = ({products, isAuthenticated}) => {
        return (
            <div className = 'row justify-content-left'>
                {products.map(product => {
                    return (
                        <Item prod = {product.product} isAuthenticated = {isAuthenticated}/> 
                    )
                })}
            </div>
           
        )
}

export default RelatedProductsItemCard