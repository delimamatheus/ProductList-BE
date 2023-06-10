const Product = require('../../models/product')

// Read

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.status(200).json({ products:products })
        })
        .catch(err => console.log(err))
}

// Create

exports.createProduct = (req, res, next) => {
    const name = req.body.name
    const categoryID = req.body.categoryID
    const categoryName = req.body.categoryName
    const price = req.body.price
    const status = req.body.status
    Product.create({
        name: name,
        categoryID: categoryID,
        categoryName: categoryName,
        price: price,
        status: status
    })
        .then(result => {
            console.log('Created Product')
            res.status(201).json({
                message: 'Product created successfully!!',
                product: result
            })
        })
        .catch(err => console.log(err))
}

// Update

exports.updateProduct = (req, res, next) => {
    const productID = req.params.productID
    const updatedName = req.body.name
    const updatedCategoryID = req.body.categoryID
    const updatedCategoryName = req.body.categoryName
    const updatedPrice = req.body.price
    const updatedStatus = req.body.status
    Product.findByPk(productID)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found!' })
            }
            product.name = updatedName
            product.categoryID = updatedCategoryID
            product.categoryName = updatedCategoryName
            product.price = updatedPrice
            product.status = updatedStatus
            return product.save()
        })
        .then(result => {
            res.status(200).json({ message: 'Product updated!', product: result})
        })
        .catch(err => console.log(err))
}

// Delete

exports.deleteProduct = (req, res, next) => {
    const productID = req.params.productID
    Product.findByPk(productID)
        .then(product => {
            if (!product){
                return res.status(404).json({ message: 'Product not found!' })
            }
            return Product.destroy({
                where: {
                    id: productID
                }
            })
        })
        .then(result => {
            res.status(200).json({ message: 'Product deleted! '})
        })
        .catch(err => console.log(err))
        
}