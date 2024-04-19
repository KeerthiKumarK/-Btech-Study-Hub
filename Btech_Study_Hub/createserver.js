// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//     // Routing for different file types
//     let filePath = '.' + req.url;
//     let contentType = 'text/html';

//     // Set the content type based on the file extension
//     if (filePath === './' || filePath === 'index.html') {   
//         filePath = 'index.html';
//     } else if (filePath.endsWith('style.css')) {
//         contentType = 'text/css';
//     } else if (filePath.endsWith('.js')) {
//         contentType = 'text/javascript';
//     }

//     // Read the requested file
//     fs.readFile(path.join(__dirname, filePath), (err, data) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 // File not found
//                 res.writeHead(404, { 'Content-Type': 'text/plain' });
//                 res.end('404 Not Found');
//             } else {
//                 // Server error
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.end('500 Internal Server Error');
//             }
//         } else {
//             // File found, serve it with appropriate content type
//             res.writeHead(200, { 'Content-Type': contentType });
//             res.end(data);
//         }
//     });
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const http = require('http');
// const fs = require('fs');

// http.createServer((req, res) => {
//   fs.readFile('index.html','utf8',(err, data) => {
//     if (err) {
//       res.writeHead(500);
//       res.end('Error loading index.html');
//     } else {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(data);
//     }
//   });
// }).listen(3000);

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = 'index.html';
    // filePath = 'style.css';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
  }[extname] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading ' + filePath);
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    }
  });
}).listen(3001)
{
  console.log("Server is running")
};

