const db = require("../models");
const { category: Category, subcategory: SubCategory } = db;
const cloudinary = require('../config/cloudinary.config')


exports.addSubCategory = (req, res) => {
        try{
            SubCategory.findAll({ where: { name: req.body.name } })
            .then(async(result) => {
                if(result.length>0){
                    res.status(400).json({
                        status: 'failure', message:"SubCategory Already Exists", data: null
                    })
                    return;
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
    
                            SubCategory.create({
                                category_id: req.body.category_id,
                                name: req.body.name,
                                image: url
                            })
                            .then(async(result) => {
                                console.log(result);
                                const resdata = await SubCategory.findByPk(result.id, {
                                    include: [
                                        {
                                            model: Category,
                                            as: 'category', 
                                            attributes: ['name'],
                                        }
                                    ]
                                })

                                res.status(201).json({
                                    status: 'success', message:"SubCategory Added Successfully", data: resdata
                                });
                            })
                            .catch(err => {
                                res.status(404).json({status:'failure', message: err, data: null})
                            })
    
                        })
                        .end(buffer)
                    }
                }
            })
            .catch(err => {
                res.status(404).json({status:'failure', message: err, data: null})
            })
        }
        catch(error){
            res.status(404).json({status:'failure', message: error, data: null})
        }
};

exports.getSubCategory = async (req, res) => {
    try{
        await SubCategory.findAll({
            include: [
                {
                    model: Category,
                    as: 'category', 
                    attributes: ['name'],
                }
            ]
        })
        .then((result) => {
            if(result.length>0){
                res.status(200).json({
                    status:'success', message:"Get SubCategory Successfully", data: result,
                });
            }
            else{
                res.status(404).json({
                    status:'failure', message:"Sub Category Not Found", data: null,
                });
            }
        })
    }
    catch(error){
        res.status(404).json({status:'failure', message: error, data: null})
    }
};

exports.updateSubCategory = (req, res) => {
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
            res.status(400).json({status:'failure', message: "SubCategory Value not there", data: null})
        }
        SubCategory.findAll({ where: { name: req.body.name } })
        .then(async(result) => {
            if(result.length>0){
                    if(result.filter((ba) => ba.id !== Number(id)).length>0){
                        res.status(400).json({
                            status: 'failure', message:"SubCategory Already Exists", data: null
                        })
                        return;
                    }  
                    else{
                        if(isValidURL(req.body.image)){
                            SubCategory.update({
                                name: req.body.name,
                                category_id: req.body.category_id
                            }, { where: {id: id}})
                            .then(async(result) => {
                                const resdata = await SubCategory.findByPk(id, {
                                    include: [
                                        {
                                            model: Category,
                                            as: 'category', 
                                            attributes: ['name'],
                                        }
                                    ]
                                })

                                res.status(201).json({
                                    status: 'success', message:"SubCategory Updated Successfully", data: resdata
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
        
                                SubCategory.update({
                                    name: req.body.name,
                                    category_id: req.body.category_id,
                                    image: url
                                }, { where: {id: id}})
                                .then(async(result) => {
                                    const resdata = await SubCategory.findByPk(id, {
                                        include: [
                                            {
                                                model: Category,
                                                as: 'category', 
                                                attributes: ['name'],
                                            }
                                        ]
                                    })
                                    res.status(201).json({
                                        status: 'success', message:"SubCategory Updated Successfully", data: resdata
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
            }
            else{
                if(isValidURL(req.body.image)){
                    SubCategory.update({
                        name: req.body.name,
                        category_id: req.body.category_id
                    }, { where: {id: id}})
                    .then(async (result) => {
                        const resdata = await SubCategory.findByPk(id, {
                            include: [
                                {
                                    model: Category,
                                    as: 'category', 
                                    attributes: ['name'],
                                }
                            ]
                        })
                        res.status(201).json({
                            status: 'success', message:"SubCategory Updated Successfully", data: resdata
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

                        SubCategory.update({
                            name: req.body.name,
                            image: url
                        }, { where: {id: id}})
                        .then(async(result) => {
                            const resdata = await SubCategory.findByPk(id, {
                                include: [
                                    {
                                        model: Category,
                                        as: 'category', 
                                        attributes: ['name'],
                                    }
                                ]
                            })
                            res.status(201).json({
                                status: 'success', message:"SubCategory Updated Successfully", data: resdata
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
        })
        .catch(err => {
            res.status(404).json({status:'failure', message: err, data: null})
        })
    }
    catch(error){
        res.status(404).json({status:'failure', message: error, data: null})
    }
};

exports.deleteSubCategory = (req, res) => {

    const id = req.params.id;

    try{
        SubCategory.destroy({
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "SubCategory was deleted successfully!"
                });
              } else {
                res.send({
                  message: `Cannot delete SubCategory with id=${id}. Maybe SubCategory was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete SubCategory with id=" + id
              });
            });
    }
    catch(error){
        res.status(404).json({status:'failure', message: error, data: null})
    }
};

SubCategory.hasOne(Category, {
    foreignKey: 'id',        // Specifies the foreign key in the Category table
    sourceKey: 'category_id', // Specifies the key in SubCategory to match
    as: 'category',          // Alias for the association
});

Category.belongsTo(SubCategory, {
    foreignKey: 'id',         // Foreign key in Category table
    targetKey: 'category_id', // Key in SubCategory table to match
    as: 'subCategory',        // Alias for reverse association
  });