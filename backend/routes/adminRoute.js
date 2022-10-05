const express = require('express')
const { auth, authorizedRole } = require('../middleware/authorize')
const {getAllUsers} = require('../controllers/admin_controller/getAllUsers')
const {getSingleUser} = require('../controllers/admin_controller/getSingleUser')
const {updateUserRole} = require('../controllers/admin_controller/updateUserRole')
const {deleteUser} = require('../controllers/admin_controller/deleteUser')
const router = new express.Router()

router.get('/admin/users/all', auth, authorizedRole('admin'), getAllUsers)
router.get('/admin/users/:id', auth, authorizedRole('admin'), getSingleUser)
router.put('/admin/users/:id', auth, authorizedRole('admin'), updateUserRole)
router.delete('/admin/users/:id', auth, authorizedRole('admin'), deleteUser)
module.exports = router
