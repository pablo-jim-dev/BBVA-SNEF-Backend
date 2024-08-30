import { ENVIROMENT } from './config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import createAdminUsers from './libs/init.js';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: [
        'http://172.23.208.1',
        'http://172.23.208.2',
        'http://172.23.208.3',
        'http://172.23.208.4',
        'http://172.23.208.5',
        'http://172.23.208.6',
        'http://192.168.0.101',
        'http://192.168.0.102',
        'http://192.168.0.103:5173',
        'http://192.168.0.104',
        'http://192.168.0.105',
        'http://192.168.0.106',
        'http://192.168.100.194:5173', 
        'http://192.168.100.12:5173', 
        'http://192.168.0.101:4173', 
        'http://192.168.0.101:4173', ],
    methods: ['POST', 'PATCH']
}));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
createAdminUsers();

const server = http.createServer(app)

export default server;