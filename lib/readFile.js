const path = require('path')
const fs = require('fs')
const render = require('./render')
const viewEngine = (fileName, Tpldata) => {
  const pathName = path.join('./', 'views', fileName);
  let t = fs.readFileSync(pathName , 'utf-8' , function (err , data) {  
    if (err) {  
        console.error(err);
    } else {  
        console.log(data);  
    }  
  
}); 
  return render.tppl(t,Tpldata)
}

exports.viewEngine=viewEngine