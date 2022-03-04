const path = require('path');

let serverAbsPath = `${__filename}`;
console.log(serverAbsPath);

let appAbsPath = `${__dirname}/app.js`;
console.log(appAbsPath);

let indexRelPath = `./index.html`;
console.log(indexRelPath);

let indexAbsPath = path.join(__dirname,'index.html');
console.log(indexAbsPath);
