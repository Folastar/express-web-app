const express = require('express');
const app = express();
const path = require('path');

// Middleware to check working hours (Monday to Friday, 9 AM to 5 PM)
function checkWorkingHours(req, res, next) {
    const currentTime = new Date();
    const dayOfWeek = currentTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = currentTime.getHours();

    // Check if it's between Monday to Friday (1-5) and between 9 AM to 5 PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        return next(); // Allow request to continue
    } else {
        res.status(503).send('The website is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

// Use the working hours check middleware globally
app.use(checkWorkingHours);

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Our Services route
app.get('/services', (req, res) => {
    res.render('services');
});

// Contact Us route
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
