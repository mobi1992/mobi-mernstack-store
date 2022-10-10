const express = require('express')
const { auth, authorizedRole } = require('../middleware/authorize')
const router = new express.Router()
const {getCategories} = require('../controllers/category_controller/getCategories')
const {getCategory} = require('../controllers/category_controller/getCategory')
const {getCategoryProducts} = require('../controllers/category_controller/getCategoryProducts')
const {createCategory} = require('../controllers/category_controller/createCategory')
const {deleteCategory} = require('../controllers/category_controller/deleteCategory')
const {updateCategory} = require('../controllers/category_controller/updateCategory')

router.get('/categories', getCategories)
router.get('/:name/category/products', getCategoryProducts)
router.get('/categories/:id', getCategory)
router.post('/admin/categories', auth, authorizedRole('admin'), createCategory)
router.delete('/admin/categories/:id', auth, authorizedRole('admin'), deleteCategory)
router.patch('/admin/categories/:id', auth, authorizedRole('admin'), updateCategory)

module.exports = router