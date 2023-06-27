import express, { Express, Request, Response, NextFunction } from 'express';
import router from './router/users_router';
import sequelize from './config/database';
import User from './model/user';
import glberr from './utils/glberr';
import CustomError from './utils/cuserr';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

User.sync()
  .then(() => {
    console.log('Models synchronized successfully with the database.');
  })
  .catch((error: Error) => {
    console.error('Failed to synchronize models with the database:', error);
  });
app.use(router);
app.use(glberr);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(404, `Can't find ${req.originalUrl} on the server!`);
  next(err);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
