import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { WebSocketServer } from 'ws';

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/dist'));

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            client.send(message.toString());
        });
    });
});

app.get('/*', (_, res) => res.sendFile(path.resolve('client/dist/index.html')));

app.get('/health-check', (_, res) => res.status.json({
    success: true,
    message: 'server is operating smoothly.'
}));

httpServer.listen(port, () => console.log(`server started at - http://localhost:${port}`));