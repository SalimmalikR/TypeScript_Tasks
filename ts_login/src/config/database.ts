import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('login', 'root', 'root12345', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
