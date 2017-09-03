exports ={
  render: function(req, res, viewName, context){
      var filename = path.join(__dirname, 'views', viewName);
      try{
          var output = Shotenjin.renderView(filename, context);
      }catch(err){
          console.log(err)
          return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(output);
  }
}