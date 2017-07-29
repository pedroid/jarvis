var fs = require("fs");
var file = "./test.db";

//載入 sqlite3
var sqlite3 = require("sqlite3").verbose();
//新增一個sqlite3的資料庫test.db
var db = new sqlite3.Database(file);

db.serialize(function() {
  //如果表格test01不存在，就新增test01
  db.run("CREATE TABLE IF NOT EXISTS  table01 (name TEXT,remark TEXT)");
    
  //新增資料
  var sql01 = "INSERT INTO table01(name,remark) VALUES (?,?)";
  db.run(sql01,["John","aaa"]);
  db.run(sql01,["May","bbb"]);
  db.run(sql01,["Terry","ccc"]);
  db.run(sql01,["Kevin","ddd"]);  
  
    
});

db.close();
