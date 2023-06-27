import { Router } from 'express';
import createUser from '../controllers/create_users';
import login from '../controllers/login';
import readuser from '../controllers/read_users';
import verifyToken from '../auth/jwt';
import updateUsers from '../controllers/update_user';
import deleteUser from '../controllers/delete_user';

const router = Router();

router.post('/users', createUser);

router.post('/login', login);

router.get('/read', readuser);

router.patch('/update/:id', verifyToken, updateUsers as any);

router.delete('/delete/:id', verifyToken, deleteUser)

export default router;
