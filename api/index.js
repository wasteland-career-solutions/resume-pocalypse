
const express = require('express');
const app = express();

app.get('/answers', (req, res) => {
    // Logic to retrieve products goes here
    res.send('List of answers');
  });

  const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
