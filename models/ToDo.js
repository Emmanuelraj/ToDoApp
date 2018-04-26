var mongoose = require('mongoose');


var Schema =mongoose.Schema;




var mongooseSchema=  new Schema({

   items :
   {
     type:String,
     required:true
   }

});

module.exports = mongoose.model('items',mongooseSchema);
