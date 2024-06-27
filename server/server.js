const express = require('express');

const App = express();

const server = App.listen(3000, () => console.log('App is listening'));