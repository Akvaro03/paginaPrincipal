import express from 'express';
import path from 'path';


import { SMTPClient } from 'emailjs';
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

    // client.send(
    //     {
    //         text: 'i hope this works',
    //         from: 'alvaroballarini2010@gm',
    //         to: 'someone <someone@your-email.com>, another <another@your-email.com>',
    //         cc: 'else <else@your-email.com>',
    //         subject: 'testing emailjs',
    //     },
    //     (err, message) => {
    //         console.log(err || message);
    //     }
    // );
    
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})