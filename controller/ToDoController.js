module.exports= function (app) {


 //ToDo
   var ToDo = require('../models/ToDo');

   // mongoose
   var mongoose = require('mongoose');



  mongoose.connect('mongodb://test:test@ds257579.mlab.com:57579/todoappli');

/**get method
   this method shows the prepopulate in db
*/
  app.get('/todo',function(request,response)
  {
    console.log('get method');
        ToDo.find({},function(err,items)
        {
            response.render('todo',{items:items});
        });
  });

  app.post('/todo',function(request,response)
  {

    console.log('post method'+request.body.items);


       new ToDo({

         items : request.body.items

        }).save(function(err)
        {

          if(err)
           {
             console.log('err'+err);
           }
           else
           {
              response.render('todo');           }
         });


  });



  /**
    Get the Single task details
  */

  app.get('/todo/:id',function(request,response)
  {

    var id=request.params.id;
     console.log('findById method');

     ToDo.findById(id,function (err, items)
      {
          console.log(items);
          response.render('todoById',{items:items});
      });
  });

  //edit by id
  app.get('/todo/edit/:id',function (request,response)
  {

    var id=request.params.id;
     console.log('edit by id method'+id);
     ToDo.findById(id,function (err, items)
      {
   response.render('editById',{title:"Edit",items:items});
      });
  });





  app.post('/todo/update/:id',function (request,response)
  {
      var id=request.params.id;
      console.log('Update by id method'+id);


      let items={};

      items.items= request.body.items;

      let query={_id:id};

      ToDo.update(query, items, function(err)
      {
         if(err)
          {
            console.log(err);
          }
          else
           {
             response.redirect('/todo');
           }
      });
  });




  //delete by id

     app.get('/todo/delete/:id',function(request,response)
     {
        console.log('delete by Id');

         let query ={_id:request.params.id};

         ToDo.remove(query,function (err)
         {
              if(err)
                {
                  console.log(err);
                }
                else {
                    response.redirect('/todo') ;
                }
         })
     });

};
