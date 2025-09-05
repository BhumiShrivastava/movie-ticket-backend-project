var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/movieinterface', function(req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    console.log("Data",data)
    if(data==null){
      res.render('loginpage',{message:''});
    }
    else{
    res.render('movieinterface',{message:''});}
  }
  catch(e)
  {
    res.render('loginpage',{message:''});
  }
    
  });
  
 router.post('/submit_movie',upload.single('picture'),function(req,res){
  console.log("BODY",req.body)   
  console.log("FILE",req.file)
  pool.query("insert into moviedetails (stateid, cityid, cinemaid, screenid, moviename, description, actor, actress, singer, releasedate, price, status, poster) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
  [req.body.stateid,req.body.cityid,req.body.cinemaid,req.body.screenid,req.body.moviename,req.body.description,req.body.actor,req.body.actress,req.body.singer,req.body.release,req.body.price,req.body.status,req.file.filename],function(error,result){
    if(error)
    { console.log(error)
      res.render("movieinterface",{message:'Server Error:Fail to Submit Record'})
    }
    else
    { console.log(result)
      res.render("movieinterface",{message:'Record Submitted Successfully'})
    }
  })
})
router.get('/displayallmovie', function(req, res, next) {
  try{
    var data= JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
    {res.render('loginpage',{message:''});}
    
    else{
  pool.query("select M.*,(select S.statename from state S where S.stateid=M.stateid) as statename,(select C.cityname from city C where C.cityid=M.cityid) as cityname,(select C.cinemaname from cinema C where C.cinemaid=M.cinemaid) as cinemaname,(select s.screenname from screens s where s.screenid=M.screenid) as screenname from moviedetails M",function(error,result){
    if(error){

      res.render('displayallmovie',{data:[],status:false,message:'Server Error'})
    }
    else{
      if(result.length==0){
        res.render('displayallmovie',{data:[],status:false,message:'No Record Found'})
      }
      else{
        res.render('displayallmovie',{data:result,status:true,message:'Successful'})

      }
    }
  })
}
}  
catch(e){
  res.render('loginpage');
}
});
router.get('/display_movie_byid', function(req, res, next) {
  pool.query("select M.*,(select S.statename from state S where S.stateid=M.stateid) as statename,(select C.cityname from city C where C.cityid=M.cityid) as cityname,(select C.cinemaname from cinema C where C.cinemaid=M.cinemaid) as cinemaname,(select s.screenname from screens s where s.screenid=M.screenid) as screenname from moviedetails M where M.movieid=?",[req.query.movieid],function(error,result){
    if(error){

      res.render('displaymoviebyid',{data:[],status:false,message:'Server Error'})
    }
     else{
        res.render('displaymoviebyid',{data:result[0],status:true,message:'Successful'})

      }
    
  })
});
router.post('/edit_delete',function(req,res){
  var btn=req.body.btn
   if(btn=="Edit"){
  pool.query("update moviedetails set stateid=?, cityid=?, cinemaid=?, screenid=?, moviename=?, description=?, actor=?, actress=?, singer=?, releasedate=?, price=?, status=? where movieid=?",
  [req.body.stateid,req.body.cityid,req.body.cinemaid,req.body.screenid,req.body.moviename,req.body.description,req.body.actor,req.body.actress,req.body.singer,req.body.release,req.body.price,req.body.status,req.body.movieid],
  function(error,result){
    if(error)
    { console.log(error)
      res.redirect('/movie/displayallmovie')
    }
    else
    { console.log(result)
      res.redirect('/movie/displayallmovie')
    }
  })
}
else{
  pool.query("delete from moviedetails where movieid=?",[req.body.movieid],function(error,result){
    if(error)
    { console.log(error)
      res.redirect('/movie/displayallmovie')
    }
    else
    { console.log(result)
      res.redirect('/movie/displayallmovie')
    }
  })

}
})
router.get('/show_picture', function(req, res, next) {

  res.render('showpicture',{data:req.query})
})

router.post('/edit_picture',upload.single('picture'),function(req,res){
  pool.query("update moviedetails set poster=? where movieid=?",[req.file.filename,req.body.movieid],function(error,result){
  if(error)
  { 
    res.redirect("/movie/displayallmovie")
  }
  else
  { 
  
    res.redirect("/movie/displayallmovie")
  }
  })
  })
  router.get('/newapi/:id/:name',function(req,res){
    console.log("Data id:",req.params.id)
    console.log("Data name:",req.params.name)

    res.status(200).json({status:'ok'})

  })
  
  module.exports = router;
  