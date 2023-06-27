import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/cuserr';

const glberr = (error: any, req: Request, res: Response, next: NextFunction): void => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || 'error';
  res.status(error.statuscode).json({
    statuscode: error.statuscode,
    status: error.status,
    message: error.message
  });
};

export default glberr;
