var fs = require("fs");
var file = "./test.db";

//載入 sqlite3
var sqlite3 = require("sqlite3").verbose();
//新增一個sqlite3的資料庫test.db
var db = new sqlite3.Database(file);

db.serialize(function() {
  //如果表格test01不存在，就新增test01
  db.run("CREATE TABLE IF NOT EXISTS  table01 (name TEXT,remark TEXT)");
  
  //查詢資料
  var sql02 = "SELECT rowid AS id, name,remark FROM table01"; 
  db.each(sql02, function(err, row) {
    console.log(row.id + ": " + row.name);
  });
  
    
});

db.close();
