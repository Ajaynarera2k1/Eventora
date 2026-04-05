const path = require('path');

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});