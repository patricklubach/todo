import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    req.url === "/" ? "index.html" : req.url,
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not Found");
    }

    const ext = path.extname(filePath);
    const contentTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
    };

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "text/plain",
    });

    res.end(data);
  });
});
console.log("Run server on port 3000");
server.listen(3000);
