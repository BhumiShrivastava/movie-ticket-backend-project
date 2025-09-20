var mysql=require('mysql')
var pool=mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'1234',
 database:'moviedb',
 multipleStatements:true,
})
module.exports = pool;