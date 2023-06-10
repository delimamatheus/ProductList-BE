const controller = require('../../controllers/product')
const router = require('express').Router()

router.get('/', controller.getProducts)
router.post('/', controller.createProduct)
router.put('/:productID', controller.updateProduct)
router.delete('/:productID', controller.deleteProduct)

module.exports = router