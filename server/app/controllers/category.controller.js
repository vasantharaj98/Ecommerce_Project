const db = require("../models");
const { category: Category, subcategory: SubCategory } = db;
const cloudinary = require('../config/cloudinary.config')


exports.addCategory = (req, res) => {
        try{
            if(!req.body.name){
                res.status(400).json({status:'failure', message: "Category Value not there", data: null})
            }
            Category.findAll({ where: { name: req.body.name } })
            .then(async(result) => {
                if(result.length>0){
                    res.status(400).json({
                        status: 'failure', message:"Category Already Exists", data: null
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
    
                            Category.create({
                                name: req.body.name,
                                image: url
                            })
                            .then((result) => {
                                res.status(201).json({
                                    status: 'success', message:"Category Added Successfully", data: result
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

exports.getCategory = async (req, res) => {
    try{
        await Category.findAll({
            include: [
                {
                    model: SubCategory 
                }
            ]
        })
        .then((result) => {
            if(result.length>0){
                res.status(200).json({
                    status:'success', message:"Get Category Successfully", data: result,
                });
            }
            else{
                res.status(404).json({
                    status:'failure', message:"Category Not Found", data: null,
                });
            }
        })
    }
    catch(error){
        res.status(404).json({status:'failure', message: error, data: null})
    }
};

exports.updateCategory = (req, res) => {
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
            res.status(400).json({status:'failure', message: "Category Value not there", data: null})
        }
        Category.findAll({ where: { name: req.body.name } })
        .then(async(result) => {
            if(result.length>0){
                    if(result.filter((ba) => ba.id !== Number(id)).length>0){
                        res.status(400).json({
                            status: 'failure', message:"Category Already Exists", data: null
                        })
                        return;
                    }  
                    else{
                        if(isValidURL(req.body.image)){
                            Category.update({
                                name: req.body.name
                            }, { where: {id: id}})
                            .then(async(result) => {
                                const resdata = await Category.findByPk(id);
                                res.status(201).json({
                                    status: 'success', message:"Category Updated Successfully", data: resdata
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
        
                                Category.update({
                                    name: req.body.name,
                                    image: url
                                }, { where: {id: id}})
                                .then(async(result) => {
                                    const resdata = await Category.findByPk(id);
                                    res.status(201).json({
                                        status: 'success', message:"Category Updated Successfully", data: resdata
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
                    Category.update({
                        name: req.body.name
                    }, { where: {id: id}})
                    .then(async (result) => {
                        const resdata = await Category.findByPk(id);
                        res.status(201).json({
                            status: 'success', message:"Category Updated Successfully", data: resdata
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

                        Category.update({
                            name: req.body.name,
                            image: url
                        }, { where: {id: id}})
                        .then(async(result) => {
                            const resdata = await Category.findByPk(id);
                            res.status(201).json({
                                status: 'success', message:"Category Updated Successfully", data: resdata
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

exports.deleteCategory = (req, res) => {

    const id = req.params.id;

    try{
        Category.destroy({
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Category was deleted successfully!"
                });
              } else {
                res.send({
                  message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete Category with id=" + id
              });
            });
    }
    catch(error){
        res.status(404).json({status:'failure', message: error, data: null})
    }
};

    Category.hasMany(SubCategory, {
        foreignKey:'category_id', targetKey: 'id'
    })