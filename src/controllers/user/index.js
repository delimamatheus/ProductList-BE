const User = require('../../models/user')

// Read

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({ users:users })
        })
        .catch(err => console.log(err))
}

// Login
exports.loginUser = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try{
        const user = await User.findOne( {where: { email } } )

        // var comparationPassword = password.localeCompare(user.password)

        if(!user){
            return res.status(401).json({ message: 'Invalid email or password'})
        }

        const token = ('12345')

        res.status(200).json({ user, token })
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Server Error'})
    }
}

// Create

exports.createUser = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    User.create({
        name: name,
        email: email,
        password: password
    })
        .then(result => {
            console.log('Created User')
            res.status(201).json({
                message: 'User created successfully!!',
                user: result
            })
        })
        .catch(err => console.log(err))
}

// Update

exports.updateUser = (req, res, next) => {
    const userID = req.params.userID
    const updatedName = req.body.name
    const updatedEmail = req.body.email
    const updatedPassword = req.body.password
    User.findByPk(userID)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }
            user.name = updatedName
            user.email = updatedEmail
            user.password = updatedPassword
            return user.save()
        })
        .then(result => {
            res.status(200).json({ message: 'User updated!', user: result})
        })
        .catch(err => console.log(err))
}

// Delete

exports.deleteUser = (req, res, next) => {
    const userID = req.params.userID
    User.findByPk(userID)
        .then(user => {
            if (!user){
                return res.status(404).json({ message: 'User not found!' })
            }
            return User.destroy({
                where: {
                    id: userID
                }
            })
        })
        .then(result => {
            res.status(200).json({ message: 'User deleted! '})
        })
        .catch(err => console.log(err))
        
}