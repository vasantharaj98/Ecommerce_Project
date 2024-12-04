const db = require("../models");
const { product: Product, cart: Cart} = db;

exports.addCart =async (req, res) => {

  try {
    Cart.create({
      customer_id: req.body.customer_id,
      product_id: req.body.product_id,
      qty: req.body.qty,
      price: req.body.price,
      total_price: req.body.total_price,
    }).then(async (result) => {
      const resdata = await Cart.findByPk(result.id, {include: [
        {
            model: Product,
            as: 'productDetails', 
            attributes: ['name', 'image', 'price'],
        }
    ]});
      res.status(201).json({
        status: "success",
        message: "Cart Added Successfully",
        data: resdata,
      });
    });
  } catch (error) {
    res.status(404).json({ status: "failure", message: error, data: null });
  }
};

exports.getCartByCustomer = async (req, res) => {

  const { page = 1, size = 10, id } = req.query;

  const limit = parseInt(size); // Number of records per page
  const offset = (parseInt(page) - 1) * limit;

  try {
    await Cart.findAll({
      limit,
      offset,
      where : {customer_id: Number(id)},
      include: [
          {
              model: Product,
              as: 'productDetails', 
              attributes: ['name', 'image', 'price'],
          }
      ]
  })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          status: "success",
          message: "Get Cart Successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "Cart Not Found",
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ status: "failure", message: error, data: null });
  }
};

exports.updateCart = (req, res) => {
  const id = req.params.id;

  try{
        Cart.update({
                customer_id: req.body.customer_id,
                product_id: req.body.product_id,
                qty: req.body.qty,
                price: req.body.price,
                total_price: req.body.total_price,
            }, { where: {id: id}})
                  .then(async (result) => {
                      const resdata = await Cart.findByPk(id, {include: [
                                      {
                                          model: Product,
                                          as: 'productDetails', 
                                          attributes: ['name', 'image', 'price'],
                                      }
                                  ]});
                      res.status(201).json({
                          status: 'success', message:"Product Updated Successfully", data: resdata
                      });
                  })
                  .catch(err => {
                      res.status(404).json({status:'failure', message: err, data: null})
                  })
  }
  catch(error){
      res.status(404).json({status:'failure', message: error, data: null})
  }
};

exports.deleteCart = (req, res) => {

  const id = req.params.id;

  try{
      Cart.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Cart was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Cart with id=" + id
            });
          });
  }
  catch(error){
      res.status(404).json({status:'failure', message: error, data: null})
  }
};

Cart.belongsTo(Product, {
  foreignKey: 'product_id',  // The foreign key in the Product table that references the Category table
  targetKey: 'id',           // The primary key in the Category table
  as: 'productDetails',      // Alias for the association
});
