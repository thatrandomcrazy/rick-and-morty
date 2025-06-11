import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the entire project root as static
app.use(express.static(__dirname));

// Redirect root to main page
// Clean routes for main pages
app.get('/characters', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'characters.html'));
});

app.get('/locations', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'locations.html'));
});

app.get('/episodes', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'episodes.html'));
});

// Detail pages with query params (serve the static HTML, let client JS handle the id)
app.get('/character-detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'character-detail.html'));
});

app.get('/episode-detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'episode-detail.html'));
});

app.get('/location-detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'location-detail.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Listening on port:${PORT}`);
})