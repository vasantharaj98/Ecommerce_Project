const db = require("../models");
const { product: Product, category: Category, subcategory: SubCategory } = db;
const cloudinary = require("../config/cloudinary.config");
const { where } = require("sequelize");

exports.addPost =async (req, res) => {
  try {
    const urls = [];
    const uploader = ( file) =>  {
        return new Promise (resolve => {
            const {originalname, mimetype, buffer} = file
            cloudinary.uploader
            .upload_stream( (error, result)=>{
                if(error) throw error;

                const {public_id} = result;

                const url  = cloudinary.url(public_id, {
                    width: 500,
                    height: 500,
                    crop: 'fill'
                })
                resolve({
                    res: url
                })
            })
            .end(buffer);
        })
    }
    const imageFile = req.file;

    const newPath = await uploader(imageFile); 

    // for (const file of imageFile) {
    //   const { originalname, mimetype, buffer } = file;
    //     const newPath = await uploader(file); 
    //       urls.push(newPath);
    // }

    // image: urls.map( url => url.res)


    Product.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      unit: req.body.unit,
      capacity: req.body.capacity,
      maxorderqty: req.body.maxorderqty,
      price: req.body.price,
      stock: req.body.stock,
      discounttype: req.body.discounttype,
      discount: req.body.discount,
      taxtype: req.body.taxtype,
      tax: req.body.tax,
      active: req.body.active,
      tags: req.body.tags,
      image: newPath.res
    }).then((result) => {
      res.status(201).json({
        status: "success",
        message: "Product Added Successfully",
        data: result,
      });
    });
  } catch (error) {
    res.status(404).json({ status: "failure", message: error, data: null });
  }
};

exports.getPost = async (req, res) => {
  try {
    await Product.findAll({
      include: [
          {
              model: Category,
              as: 'categoryDetails', 
              attributes: ['name'],
          }
      ]
  })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          status: "success",
          message: "Get Product Successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "Product Not Found",
          data: null,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ status: "failure", message: error, data: null });
  }
};

exports.getPostBySubcategory = async (req, res) => {

  const { page = 1, size = 10, id } = req.query;

  const limit = parseInt(size); // Number of records per page
  const offset = (parseInt(page) - 1) * limit;


  try {
    await Product.findAll({
      limit,
      offset,
      where : {subcategory: id},
      include: [
          {
              model: Category,
              as: 'categoryDetails', 
              attributes: ['name'],
          },
          {
            model: SubCategory,
            as: 'subcategoryDetails', 
            attributes: ['name'],
        }
      ]
  })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          status: "success",
          message: "Get Product Successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "Product Not Found",
          data: null,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ status: "failure", message: error, data: null });
  }
};

exports.getPostById = async (req, res) => {

  const id = req.params.id; 

  console.log(id);

  try {
    await Product.findByPk(id, {
      include: [
          {
              model: Category,
              as: 'categoryDetails', 
              attributes: ['name'],
          }
      ]
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          status: "success",
          message: "Get Product Successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "Product Not Found",
          data: null,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ status: "failure", message: error, data: null });
  }
};

exports.updatePost = (req, res) => {
  const id = req.params.id;

  const isValidURL = (url) => {
      try {
        new URL(url); // This will throw an error if the URL is invalid
        return true;
      } catch (error) {
        return false;
      }
    };

  try{
      if(!req.body.name){
          res.status(400).json({status:'failure', message: "Product Value not there", data: null})
      }
      if(isValidURL(req.body.image)){
                  Product.update({
                     name: req.body.name,
                     description: req.body.description,
                     category: req.body.category,
                     subcategory: req.body.subcategory,
                     unit: req.body.unit,
                     capacity: req.body.capacity,
                     maxorderqty: req.body.maxorderqty,
                     price: req.body.price,
                     stock: req.body.stock,
                     discounttype: req.body.discounttype,
                     discount: req.body.discount,
                     taxtype: req.body.taxtype,
                     tax: req.body.tax,
                     active: req.body.active,
                     tags: req.body.tags
                  }, { where: {id: id}})
                  .then(async (result) => {
                      const resdata = await Product.findByPk(id);
                      res.status(201).json({
                          status: 'success', message:"Product Updated Successfully", data: resdata
                      });
                  })
                  .catch(err => {
                      res.status(404).json({status:'failure', message: err, data: null})
                  })
              }
      else{
                  const imageFile = req.file;
              if(!imageFile){
                  res.status(400).json({status:'failure', message: "Image Is not selected", data: null})
              }
              else{
                  const {originalname, mimetype, buffer} = imageFile
                  cloudinary.uploader
                  .upload_stream( (error, result)=>{
                      if(error) throw error;

                      const {public_id} = result;

                      const url  = cloudinary.url(public_id, {
                          width: 100,
                          height: 100,
                          crop: 'fill'
                      })

                      Product.update({
                          name: req.body.name,
                          description: req.body.description,
                          category: req.body.category,
                          subcategory: req.body.subcategory,
                          unit: req.body.unit,
                          capacity: req.body.capacity,
                          maxorderqty: req.body.maxorderqty,
                          price: req.body.price,
                          stock: req.body.stock,
                          discounttype: req.body.discounttype,
                          discount: req.body.discount,
                          taxtype: req.body.taxtype,
                          tax: req.body.tax,
                          active: req.body.active,
                          tags: req.body.tags,
                          image: url
                      }, { where: {id: id}})
                      .then(async(result) => {
                          const resdata = await Product.findByPk(id);
                          res.status(201).json({
                              status: 'success', message:"Product Updated Successfully", data: resdata
                          });
                      })
                      .catch(err => {
                          res.status(404).json({status:'failure', message: err, data: null})
                      })

                  })
                  .end(buffer)
              }
          }
  }
  catch(error){
      res.status(404).json({status:'failure', message: error, data: null})
  }
};

exports.deletePost = (req, res) => {

  const id = req.params.id;

  try{
      Product.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Product was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Product with id=" + id
            });
          });
  }
  catch(error){
      res.status(404).json({status:'failure', message: error, data: null})
  }
};

// A Product belongs to one Category
Product.belongsTo(Category, {
  foreignKey: 'category', // The foreign key in the Product table that references the Category table
  targetKey: 'id',        // The primary key in the Category table
  as: 'categoryDetails',         // Alias for the association
});

Product.belongsTo(SubCategory, {
  foreignKey: 'subcategory', // The foreign key in the Product table that references the Category table
  targetKey: 'id',        // The primary key in the Category table
  as: 'subcategoryDetails',         // Alias for the association
});

// // A Category can have many Products
// Category.hasMany(Product, {
//   foreignKey: 'category', // The foreign key in the Product table
//   sourceKey: 'id',        // The primary key in the Category table
//   as: 'products',         // Alias for the association
// });
