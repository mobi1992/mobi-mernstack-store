const express = require('express')
const { auth, authorizedRole } = require('../middleware/authorize')
const {getAllProducts} = require('../controllers/product_controller/getAllProducts')
const {createProduct} = require('../controllers/product_controller/createProduct')
const {updateProduct} = require('../controllers/product_controller/updateProduct')
const {deleteProduct} = require('../controllers/product_controller/deleteProduct')
const {deleteProductCategory} = require('../controllers/product_controller/deleteProductCategory')
const {productDetail} = require('../controllers/product_controller/productDetail')
const {createProductReviewLoggedinUser} = require('../controllers/product_controller/createProductReview')
const {createProductReviewUnknownUser} = require('../controllers/product_controller/createProductReviewUnknownUser')
const { getProductReviews } = require('../controllers/product_controller/getProductReviews')
const { deleteProductReview } = require('../controllers/product_controller/deleteProductReview')
const router = new express.Router()
const multer = require('multer')
const { updateProductStock } = require('../controllers/product_controller/updateProductStock')
const { deleteTheCategory } = require('../controllers/product_controller/deleteTheCategory')
const { deleteTheRelatedProduct } = require('../controllers/product_controller/deleteTheRelatedProduct')


// const upload = multer({
//     // dest : 'avatars',
//     // to limit the size of file being uploaded
//     limits: {
//         fileSize: 2000000    // 1MB
//     },
//     fileFilter(req, file, cb) {     // cb is for callback
//         // we are gonna use a regular expression for checking that the image file with .png .jpg .jpeg extentions can get uploaded
//         // you can go to https://regex101.com to check and verify your regular expressions
//         if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//             // In case of error
//             cb(new Error('Please upload an image.'))
//         }

//         // create a new property on req object for filename
//         req.filename = file.originalname
//         console.log(req.filename)
//         // In case of successful upload, error is undefined and second arg is true which presents successful upload
//         cb(undefined, true)
//         // if the upload is rejected
//         // cb(undefined, false)
//     }
// })
router.get('/products', getAllProducts)
router.post('/admin/products/new', auth, authorizedRole('admin'), createProduct)
router.patch('/admin/products/:id', auth, authorizedRole('admin'), updateProduct)
router.delete('/admin/products/:id', auth, authorizedRole('admin'), deleteProduct)
router.put('/admin/delete/productCategory/:id', auth, authorizedRole('admin'), deleteTheCategory)
router.put('/delete/admin/relatedProduct/:id', auth, authorizedRole('admin'), deleteTheRelatedProduct)
router.put('/delete/admin/productReview/:id', auth, authorizedRole('admin'), deleteProductReview)
router.get('/:id/prod', productDetail) 
router.put('/product/review/logged-in-user', auth, createProductReviewLoggedinUser)
router.post('/product/review/unknown-user', createProductReviewUnknownUser)
router.get('/product/review', getProductReviews)
router.put('/update/product-stock/:id', updateProductStock)
module.exports = router