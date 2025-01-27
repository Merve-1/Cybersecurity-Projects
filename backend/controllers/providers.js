const providers = require('../models/providers')
//list
module.exports.list = function(req,res){
    res.render('providers/providers-list',{title: 'Service Providers', providers: providers})
}

//details
module.exports.details = function(req,res){
    let id= req.params.id;
    let provider = providers.find(provider => provider.id == id);
    res.render('providers/providers-details',{id: id, title: 'Service Providers Details', company: provider.company})
}

//edit form
module.exports.edit = function(req,res){
    let id= req.params.id;
    let provider = providers.find(provider => provider.id == id);
    res.render('providers/providers-edit',{id: id, title: 'Service Providers Edit', provider: provider})
}

//update form
module.exports.update = function(req,res){
    let id= req.params.id;
    let provider = providers.find(provider => provider.id == id);
    res.render('providers/providers-update',{title: 'Service Providers Update'})
}