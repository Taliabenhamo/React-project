const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/MyCardsApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB...'));
