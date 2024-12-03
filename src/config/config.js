import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3307,
        database: 'quanlycuahanggiay',
        password: '', 
        Promise: bluebird,
    });
};

export default createConnection;