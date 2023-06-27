import User from '../model/user';
import CustomError from '../utils/cuserr';

interface UserService {
  deleteUser: (id: string, email: string) => Promise<void>;
}

const userService: UserService = {
  deleteUser: async (id, email) => {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      if (user.email !== email) {
        throw new CustomError(403, 'Unauthorized to delete user data from the database');
      }

      await user.destroy();
    } catch (error: any) {
      throw new CustomError(500, error.message);
    }
  },
};

export default userService;
