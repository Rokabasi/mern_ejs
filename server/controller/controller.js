var Userdb = require('../model/model')

//create and save new user
exports.create = (req,res) =>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"});
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the database

    user
        .save(user)
        .then(data =>{
            // res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "some error occurred while creating create operation"
            })
        })
}

//retrieves and return all users/retrive and return a single user
exports.find=(req,res)=>{

        if(req.query.id){
            const id = req.query.id;

            Userdb.findById(id)
                .then(data => {
                    if(data){
                        res.status(404).send({message : "not found user with id" + id})
                    }
                })
                .catch(err =>{
                    res.status(500).send({message : "error retrieving with id" + id})
                })
        }else{

            Userdb.find()
            .then(user =>{
                res.send(user)
            })
            .catch(err =>{
                res.status(500).send({
                    message : err.message || "Error occurred while retrieve information"
                })
            })        
        }    

}

//update a neqw identified user bu user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .Send({message:"Data tu update can not br empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {userFindAndModify:false})
        .then(data =>{
            if(data){
                res.status(404).send({message:`cannot update user with ${id}, Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({
                message :  "Error update user information"
            })
        })
}

//delete a user with specified user id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(data){
                res.status(404).Send({message : `cannot delete user with ${id}, Maybe user not found!`})
            }else{
                res.send({
                    message : "user was delete successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message : message || "could not delete User with id=" + id
            })
        })

}