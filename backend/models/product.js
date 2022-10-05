const mongoose = require('mongoose')
const validator = require('validator')
const Category = require('./category')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Name should be unique'],
        required: [true, 'Please enter product name'],
        trim: true
    },

    ingredients: {
        type: String,
        required: [true, 'Please enter product ingredients'],
        trim: true
    },

    description: {
        type: String,
        required: [true, 'Please enter product description'],
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxlength: [6, 'Price cannot exceed 6 characters']
    },

    // picture: {
    //     type: Buffer
    // },

    // picture_name: {
    //     type: String,
    // },

    // picture_url: {
    //     type: String
    // },

    prod_categories: [
        {
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Category,
            }
        }
    ],

    related_products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            }
        }
    ],

    ratings: {
        type: Number,
        default: 0
    },

    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxlength: [4, 'Stock cannot exceed 4 characters'],
        default: 1
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            user: {
                // type : mongoose.Schema.Types.ObjectId,
                type: String,
                // ref : 'User',
                // required : true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String
            }
        }
    ],

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    // save the user id in db as well, the user who has created that product
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

productSchema.methods.toJSON = function () {
    const product = this
    const productObject = product.toObject()
    delete productObject.picture
    return productObject
}

productSchema.methods.setCategories = async function (reqBodyCategories) {
    const product = this
    console.log('categories are', reqBodyCategories)
    // split the categories in parts which seperated by ,
    const reqCatgs = reqBodyCategories.split(',')
    // console.log('req cat is : ', reqCatgs)
    // Assign these value to product categories array
    reqCatgs.forEach(reqCat => {
        // console.log(reqCat)
        // console.log(product.prod_categories)
        //console.log(product.prod_categories.some(category => category.category.toHexString() === reqCat))
        if (!product.prod_categories.some(category => category.category.toHexString() === reqCat)) {
            product.prod_categories.push({ category: reqCat })
        }
        //console.log(product.prod_categories)
    })
    await product.save()
    // console.log(product)
}

productSchema.methods.setRelatedProducts = async function (reqBodyProducts) {
    const product = this
    // split the categories in parts which seperated by ,
    const reqProds = reqBodyProducts.split(',')
    // console.log('req cat is : ', reqCatgs)
    // Assign these value to product categories array
    reqProds.forEach(reqProd => {
        // console.log(reqCat)
        // console.log(product.prod_categories)
        //console.log(product.prod_categories.some(category => category.category.toHexString() === reqCat))
        if (!product.related_products.some(prod => prod.product.toHexString() === reqProd)) {
            product.related_products.push({ product: reqProd })
        }
        //console.log(product.prod_categories)
    })
    await product.save()
    // console.log(product)
}

productSchema.methods.deleteRelatedProduct = async function (relatedProdId) {
    const product = this
    product.related_products = product.related_products.filter(prod => prod._id.toHexString() !== relatedProdId)
    await product.save()
}

productSchema.methods.deleteCategory = async function (catgId) { 
    const product = this
    product.prod_categories = product.prod_categories.filter(prodCatg => prodCatg.category.toHexString() !== catgId)
    await product.save()
}
productSchema.methods.deleteReview = async function (reviewId) {
    const product = this
    product.reviews = product.reviews.filter(review => review._id.toHexString() !== reviewId)
    await product.save()
    return product.reviews
}
const Product = mongoose.model('Product', productSchema)
module.exports = Product