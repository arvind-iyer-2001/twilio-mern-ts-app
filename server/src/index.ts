import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import { generateTwilioToken } from './tokens';
import cors from 'cors';
import { Identity } from './types/Identity.types';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
app.use(morgan('dev'));

app.use(cors());

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/video/token', (req, res) => {
    console.log('token requested');
    const identity = req.body.identity as string;
    const roomName = req.query.roomName as string;
    console.log(identity, roomName);
    const token = generateTwilioToken(identity, roomName);
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            roomName,
            token: token
        })
    );    
});

app.post('/video/token', (req, res) => {
    console.log('token requested');
    const identity = req.body.identity as string;
    const roomName = req.query.roomName as string;
    console.log(req.body);
    console.log(identity, roomName);
    const token = generateTwilioToken(identity, roomName);
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            roomName,
            token: token
        })
    );    
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
