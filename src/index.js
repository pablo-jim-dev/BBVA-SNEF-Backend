import app from './app.js';
import { connect } from './db.js';

connect();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});