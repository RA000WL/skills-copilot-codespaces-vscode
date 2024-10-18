// Create web server with Express
// Use middleware to parse JSON and form data
// Use middleware to serve static files
// Serve HTML file with form
// Serve JSON data with comments
git 
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'comments.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'comments.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    const comments = JSON.parse(data);

    comments.push(req.body);

    fs.writeFile(path.join(__dirname, 'data', 'comments.json'), JSON.stringify(comments), err => {
      if (err) {
        return res.status(500).send(err);
      }

      res.json(req.body);
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Create a new directory named data
// Create a new file named comments.json in the data directory
// Start the server and test the application
// Verify that you can add comments to the comments.json file
// Verify that you can retrieve the comments from the comments.json file
// Verify that you can see the comments on the web page
