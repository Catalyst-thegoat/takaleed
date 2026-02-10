const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3009

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

const server = http.createServer((req, res) => {
  // API endpoint
  if (req.url === '/api/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      product: 'Takaleed',
      status: 'running',
      version: '1.0.0',
      type: 'Moroccan Invoicing Platform',
      features: ['TVA 20%', 'ICE/IF/RC Support', 'PDF Export', 'Stripe Payments']
    }))
    return
  }

  // Serve static files
  let filePath = req.url === '/' ? '/index.html' : req.url
  filePath = path.join(__dirname, 'public', filePath)
  
  const ext = path.extname(filePath)
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404)
      res.end('Not Found')
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content)
    }
  })
})

server.listen(PORT, () => {
  console.log(`🚀 Takaleed running on http://localhost:${PORT}`)
})
