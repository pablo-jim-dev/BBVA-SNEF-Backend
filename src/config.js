import dotenv from 'dotenv';

export const ENVIROMENT = process.env.NODE_ENV;

if (ENVIROMENT === 'dev') {
    dotenv.config({ path: '.env.dev' });
    console.log('Development enviroment');
    
} else {
    dotenv.config({ path: '.env' });
    console.log('Production enviroment');
}

export const { MONGODB_URI, JWT_SECRET } = process.env;