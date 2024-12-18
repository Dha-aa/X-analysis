const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // You can set any port.

app.get('/api/elonmusk', (req, res) => {
  const filePath = path.join(__dirname, 'data','elonmusk.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read the file.' });
    }
    res.json(JSON.parse(data)); // Send the file content as JSON response.
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
