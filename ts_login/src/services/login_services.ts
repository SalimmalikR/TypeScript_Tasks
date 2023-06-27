import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user';
import CustomError from '../utils/cuserr';

interface UserService {
  login: (email: string, password: string) => Promise<string>;
}

const userService: UserService = {
  login: async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new CustomError(404, 'Invalid email');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new CustomError(404, 'Invalid password');
      }

      // If both email and password are correct, generate a JWT token
      const token = jwt.sign({ email: user.email }, 'secretkey');
      return token;
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  },
};

export default userService;
