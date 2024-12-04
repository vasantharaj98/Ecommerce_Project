const db = require("../models");
const { banner: Banner} = db;
const cloudinary = require('../config/cloudinary.config')


exports.addBanner = (req, res) => {
        try{
            if(!req.body.attribute){
                res.status(400).json({status:'failure', message: "Attribute Value not there", data: null})
            }
            Banner.findAll({ where: { attribute: req.body.attribute } })
            .then(async(result) => {
                if(result.length>0){
                    res.status(400).json({
                        status: 'failure', message:"Attribute Already Exists", data: null
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
    
                            const url  = cloudinary.url(public_id)
    
                            Banner.create({
                                attribute: req.body.attribute,
                                image: url
                            })
                            .then((result) => {
                                res.status(201).json({
                                    status: 'success', message:"Banner Added Successfully", data: result
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

exports.getBanner = async (req, res) => {
    try{
        await Banner.findAll()
        .then((result) => {
            if(result.length>0){
                res.status(200).json({
                    status:'success', message:"Get Banners Successfully", data: result,
                });
            }
            else{
                res.status(404).json({
                    status:'failure', message:"Banner Not Found", data: null,
                });
            }
        })
    }
    catch(error){
        res.status(404).json({status:'failure', message: error, data: null})
    }
};

exports.updateBanner = (req, res) => {
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
        if(!req.body.attribute){
            res.status(400).json({status:'failure', message: "Attribute Value not there", data: null})
        }
        Banner.findAll({ where: { attribute: req.body.attribute } })
        .then(async(result) => {
            if(result.length>0){
                    if(result.filter((ba) => ba.id !== Number(id)).length>0){
                        res.status(400).json({
                            status: 'failure', message:"Attribute Already Exists", data: null
                        })
                        return;
                    }  
                    else{
                        if(isValidURL(req.body.image)){
                            Banner.update({
                                attribute: req.body.attribute
                            }, { where: {id: id}})
                            .then(async(result) => {
                                const resdata = await Banner.findByPk(id);
                                res.status(201).json({
                                    status: 'success', message:"Banner Updated Successfully", data: resdata
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
        
                                const url  = cloudinary.url(public_id)
        
                                Banner.update({
                                    attribute: req.body.attribute,
                                    image: url
                                }, { where: {id: id}})
                                .then(async(result) => {
                                    const resdata = await Banner.findByPk(id);
                                    res.status(201).json({
                                        status: 'success', message:"Banner Updated Successfully", data: resdata
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
                    Banner.update({
                        attribute: req.body.attribute
                    }, { where: {id: id}})
                    .then(async (result) => {
                        const resdata = await Banner.findByPk(id);
                        res.status(201).json({
                            status: 'success', message:"Banner Updated Successfully", data: resdata
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

                        const url  = cloudinary.url(public_id)

                        Banner.update({
                            attribute: req.body.attribute,
                            image: url
                        }, { where: {id: id}})
                        .then(async(result) => {
                            const resdata = await Banner.findByPk(id);
                            res.status(201).json({
                                status: 'success', message:"Banner Updated Successfully", data: resdata
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

exports.deleteBanner = (req, res) => {

    const id = req.params.id;

    try{
        Banner.destroy({
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Banner was deleted successfully!"
                });
              } else {
                res.send({
                  message: `Cannot delete Banner with id=${id}. Maybe Banner was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete Banner with id=" + id
              });
            });
    }
    catch(error){
        res.status(404).json({status:'failure', message: error, data: null})
    }
};