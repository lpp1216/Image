//文件下载
var fs = require("fs");
var path = require("path");
var request = require("request");
var stream = require('stream');
var rp = require('request-promise');
var fetch = require("node-fetch");

var liner = new stream.Transform( { objectMode: true } )  
liner._transform = function (chunk, encoding, done) {  
  var data = chunk.toString()  
  if (this._lastLineData) data = this._lastLineData + data  
  
  var lines = data.split('\n')  
  this._lastLineData = lines.splice(lines.length-1,1)[0]  
  
  lines.forEach(this.push.bind(this))  
  done()  
}  
  
liner._flush = function (done) {  
     if (this._lastLineData) this.push(this._lastLineData)  
     this._lastLineData = null  
     done()
}  


module.exports = liner;

//测试：打印出文本文件的每一行  
var fs = require('fs')  
var source = fs.createReadStream('fonts.css')
source.pipe(liner)  
liner.on('readable', function () {
  var line
  while (line = liner.read()) {  
        if (line.indexOf('https') > 0) {
            let arr1  = line.split('(');
            arr1.forEach(async function(val){
                if (val.indexOf('https') >= 0) {
                    let arr2 = val.split(')');
                    let filepath = arr2[0];

                    let fileName = path.basename(filepath);
                    // console.info(fileName);
                    let dirPath = "../fonts/" + fileName;
                    console.log(dirPath);
                    // request.get(filepath).pipe(fs.createWriteStream(dirPath)).on("close", function (err) {
                    //     console.log("文件[" + dirPath + "]下载完毕");
                    // });
                    download(filepath, dirPath);
                }
            });
        }
    }  
});

function download(u, p) {
    return fetch(u, {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
    }).then(res => res.buffer()).then(_ => {
        fs.writeFile(p, _, "binary", function (err) {
            console.log(err || p);
        });
    });
// }