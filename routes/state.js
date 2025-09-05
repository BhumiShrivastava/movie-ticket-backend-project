var express = require('express');
var router = express.Router();
var pool= require('./pool');

/* GET home page. */
router.get('/fetch_all_state', function(req, res, next) {
    pool.query('select * from state', function(error,result){
        if(error){
        res.status(200).json({result:[],message:'Server error:issue in database'})
        }
        else{
            res.status(200).json({result:result,message:'Success'})

        }
    })
  });
    router.get('/fetch_all_city', function(req, res, next) {

          pool.query("select * from city where stateid=?",[req.query.stateid],function(error,result){
          if(error)
          {  console.log(error)
            res.status(200).json({result:[],message:'Server error:issue in database'})
          }
          else
          { 
            res.status(200).json({result:result,message:'Success'})
          }
        })
      });   
 router.get('/fetch_all_cinema', function(req, res, next) {

  pool.query("select * from cinema where cityid=?",[req.query.cityid],function(error,result){
    if(error)
    {
      res.status(200).json({result:[],message:'Server error:issue in database'})
    }
    else
    { 
      res.status(200).json({result:result,message:'Success'})
    }

  })
});
router.get('/fetch_all_screen', function(req, res, next) {

  pool.query("select * from screens where cinemaid=?",[req.query.cinemaid],function(error,result){
    if(error)
    {
      res.status(200).json({result:[],message:'Server error:issue in database'})
    }
    else
    { 
      res.status(200).json({result:result,message:'Success'})
    }

  })
});

module.exports = router;
