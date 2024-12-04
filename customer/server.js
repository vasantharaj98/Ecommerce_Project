const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to modify the HTML and insert dynamic meta tags
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the HTML file');
        }

        // Define dynamic meta tags based on the request or some logic
        const metaTags = {
            title: 'My Dynamic Title',
            description: 'This is a dynamically generated description.',
            keywords: 'dynamic, meta, tags, react'
        };

        // Replace placeholders or inject the meta tags into the HTML
        let updatedHtml = data.replace(
            /<title>.*<\/title>/,
            `<title>${metaTags.title}</title>`
        );
        updatedHtml = updatedHtml.replace(
            /<meta name="description" content=".*">/,
            `<meta name="description" content="${metaTags.description}">`
        );
        updatedHtml = updatedHtml.replace(
            /<meta name="keywords" content=".*">/,
            `<meta name="keywords" content="${metaTags.keywords}">`
        );

        // Send the modified HTML
        res.send(updatedHtml);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
