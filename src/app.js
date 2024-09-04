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
        'http://192.168.0.101:5174',
        'http://192.168.0.101:4173',
        'http://192.168.0.101:5173',
        'http://192.168.0.102:4173',
        'http://192.168.0.102:5173',
        'http://192.168.0.103:4173',
        'http://192.168.0.103:5173',
        'http://192.168.0.104:4173',
        'http://192.168.0.104:5173',
        'http://192.168.0.105:4173',
        'http://192.168.0.105:5173',
        'http://192.168.0.106:4173',
        'http://192.168.0.106:5173',
        'http://192.168.0.107:4173',
        'http://192.168.0.107:5173',
        'http://192.168.0.108:4173',
        'http://192.168.0.108:5173',
        'http://192.168.0.109:4173',
        'http://192.168.0.109:5173',
        'http://192.168.0.110:4173',
        'http://192.168.0.110:5173',
        'http://192.168.0.111:4173',
        'http://192.168.0.111:5173',
        'http://192.168.0.112:4173',
        'http://192.168.0.112:5173',
    ],
    methods: ['POST', 'PATCH']
}));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
createAdminUsers();

const server = http.createServer(app)

export default server;