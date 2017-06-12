'user strict'

const Product = require('../models/product')

function getProduct (req, res) {
  let productId = req.params.id
  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
    if (!product) return res.status(404).send({message: `Error el producto no existe ${product}`})

    res.status(200).send({product})
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
    if (!products) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({products})
    //res.send(200, {products})
  })
}

function createProduct (req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let products = new Product()
  products.name = req.body.name
  products.picture = req.body.picture
  products.price = req.body.price
  products.category = req.body.category
  products.description = req.body.description

  products.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
    res.status(200).send({ product: productStored })
  })
}

function updateProduct (req, res) {
  let productId = req.params.id
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err) res.status(500).send({ message: `Error al actualizar el producto: ${err}` })

    res.status(200).send({product: productUpdate})
  })
}

function deleteProduct (req, res) {
  let productId = req.params.id

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({ message: 'El producto ha sido eliminado' })
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
