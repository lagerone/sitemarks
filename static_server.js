var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888,
    siteDir = '/build';
 
http.createServer(function(request, response) {
 
  var uri = siteDir + url.parse(request.url).pathname,
    filename = path.join(process.cwd(), uri),
    contentType = getContentType(filename);

  path.exists(filename, function(exists) {
    if (!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
  }
 
  if ( fs.statSync(filename).isDirectory() ) filename += 'index.html';

  fs.readFile(filename, "binary", function(err, file) {
      if (err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      
      response.writeHead(200, {
        'Content-Type': contentType
      });
      response.write(file, "binary");
      response.end();
    });
  });

}).listen(parseInt(port, 10));
 
function getContentType (filename) {
  var t = getFileType(filename);
  if (t === 'js') return 'application/javascript';
  if (t === 'css') return 'text/css';
  if (t === 'html' || t.indexOf('\\') !== -1 || t.indexOf('/') !== -1) return 'text/html';
  return 'text/plain';
}

function getFileType (filename) {
  var f = filename.split('.');
  return f[f.length - 1];
}

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");