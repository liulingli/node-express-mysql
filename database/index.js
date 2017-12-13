import mysql from 'mysql';
import  { Sequelize } from 'sequelize';

let sequelizeModal = new Sequelize('sql9210308', 'sql9210308', 'Rrj8eqc97M', {
    host : "sql9.freemysqlhosting.net",
    port: '3306',
    dialect: 'mysql',
    timestamps: true,
});

sequelizeModal
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelizeModal;
