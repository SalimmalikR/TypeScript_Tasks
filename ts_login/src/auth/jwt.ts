import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    email?: string;
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token not found' });
    }

    const secretKey = 'secretkey';

    try {
        const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
        req.email = decoded.email as string;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};

export default verifyToken;
