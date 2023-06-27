import User from '../model/user';
import CustomError from '../utils/cuserr';

interface UserService {
  getAllUsers: () => Promise<User[]>;
}

const userService: UserService = {
  getAllUsers: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  },
};

export default userService;
