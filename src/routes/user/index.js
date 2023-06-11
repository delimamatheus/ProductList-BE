const controller = require('../../controllers/user')
const router = require('express').Router()

router.get('/', controller.getUsers)
router.post('/', controller.createUser)
router.put('/:userID', controller.updateUser)
router.delete('/:userID', controller.deleteUser)
router.post('/login', controller.loginUser)

module.exports = router