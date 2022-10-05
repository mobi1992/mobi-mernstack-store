import React from 'react'
import Item from './item'

const AdminRelatedProductsItemCard = ({products}) => {
        return (
            <div className = 'row justify-content-left'>
                {products.map(prod => {
                    return (
                        <Item product = {prod.product} /> 
                    )
                })}
            </div>
           
        )
}

export default AdminRelatedProductsItemCard