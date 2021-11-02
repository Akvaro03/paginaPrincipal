// import express from 'express';
// import path from 'path';
const express = require('express');
const path = require(`path`);




// import { SMTPClient } from 'emailjs';
const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});

const {pathname: root} = new URL('../src', import.meta.url)
const app = express();
let __dirname = path.resolve(path.dirname(''));

app.use(express.static(path.join(__dirname, `public`)));


app.get('/', async(req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/hola', async(req, res) => {
    res.send("Hola");
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})